/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import isEmpty from "lodash/isEmpty";
import { API_ENDPOINT } from "@difx/constants";
import { Loading, Typography, Icon } from "@difx/core-ui";
import { useAtomValue } from "jotai/utils";
import { Order, isLoggedInAtom, useHttpGetByEvent, useSocket, SocketEvent } from "@difx/shared";
import { getCurrentDateTimeByDateString } from "@difx/utils";
import t from "@difx/locale";
import { Button, Table } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import OrderHistoryReportExpanded from "./OrderHistoryReportExpanded";


export function OrderHistoryReport({ isSelectedPairOnly = false, height = 200, pair }: { isSelectedPairOnly?: boolean, height?: number; pair: string }) {

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const [tableData, setTableData] = useState<Array<Order>>([]);


  // Limit order
  const userOrdersData = useSocket({ event: SocketEvent.user_orders });
  useEffect(() => {
    if (userOrdersData) {
      const index = tableData.findIndex(e => e.id === userOrdersData.id);
      if (index !== -1) {
        if (userOrdersData.q === 0) {
          tableData.splice(index, 1);
        } else {
          tableData[index].q = userOrdersData.q;
        }
      } else {
        userOrdersData.timestamp = new Date();
        tableData.push(userOrdersData);
      }
      setTableData([...tableData]);
    }
  }, [userOrdersData]);

  // Stop limit order
  const userStopLimitOrdersData = useSocket({ event: SocketEvent.user_stoplimits });
  useEffect(() => {
    if (userStopLimitOrdersData) {
      const index = tableData.findIndex(e => e.id === userStopLimitOrdersData.id);
      if (index !== -1) {
        if (userStopLimitOrdersData.q === 0) {
          tableData.splice(index, 1);
        } else {
          tableData[index].q = userStopLimitOrdersData.q;
        }
      } else {
        userStopLimitOrdersData.timestamp = new Date();
        tableData.push(userStopLimitOrdersData);
      }
      setTableData([...tableData]);
    }
  }, [userStopLimitOrdersData]);

  const getOrderBookSuccess = (response: AxiosResponse<{ result: Array<Order> }>) => {
    const { data } = response;
    if (data && !isEmpty(data.result)) {
      for (const order of data.result) {
        if (!tableData.find(e => e.id === order.id)) {
          tableData.push(order);
        }
      }
      let newTableData = tableData;
      if (isSelectedPairOnly) {
        newTableData = newTableData.filter((e: any) => e.symbol === pair);
      }
      setTableData([...newTableData]);
    } else {
      setTableData([]);
    }
  }
  const { mutate: getOrderBooks, isLoading: isDataLoading } = useHttpGetByEvent<any, { result: Array<Order> }>({ onSuccess: getOrderBookSuccess, endpoint: API_ENDPOINT.GET_ORDER_HISTORY() });

  useEffect(() => {
    if (isLoggedIn) {
      if (isSelectedPairOnly && pair) {
        getOrderBooks({ endpoint: API_ENDPOINT.GET_ORDER_HISTORY(pair) });
      } else {
        getOrderBooks(null);
      }
    }
  }, [isLoggedIn, isSelectedPairOnly, pair]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
      render: (text, record) => {
        return (
          <div className="cell">
            <Typography level="B3">{text}</Typography>
          </div>
        )
      }
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      sorter: {
        compare: (a, b) => a.symbol.localeCompare(b.symbol),
      },
      render: (text) => {
        return (
          <div className='cell'>
            <Typography level="B3">{text}</Typography>
          </div>
        )
      }
    },
    {
      title: 'Side',
      dataIndex: 's',
      sorter: {
        compare: (a, b) => a.s - b.s,
      },
      render: (text, record) => {
        return (
          <div className='cell'>
            <Typography level="B3" color={(record.s === 0 || record.side === 0) ? 'success' : 'danger'}>{(record.s === 0 || record.side === 0) ? 'BUY' : 'SELL'}</Typography>
          </div>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'p',
      sorter: {
        compare: (a, b) => (a.p && b.p) ? (a.p - b.p) : (a.limit - b.limit),
      },
      render: (text, record) => {
        return (
          <div className='cell'>
            <Typography level="B3">{record.p || record.limit}</Typography>
          </div>
        )
      }
    },
    {
      title: 'Amount',
      dataIndex: 'q',
      sorter: {
        compare: (a, b) => a.q - b.q,
      },
      render: (text) => {
        return (
          <div className='cell'>
            <Typography level="B3">{text}</Typography>
          </div>
        )
      }
    },
    {
      title: 'Date',
      sorter: {
        compare: (a, b) => {
          const aTime = new Date(a.timestamp).getTime();
          const bTime = new Date(b.timestamp).getTime();
          return aTime - bTime;
        },
      },
      dataIndex: 'timestamp',
      render: (text) => {
        return (
          <div className='cell'>
            <Typography level="B3">{getCurrentDateTimeByDateString(text)}</Typography>
          </div>
        )
      }
    }
  ];

  if (isEmpty(tableData) && isDataLoading) return <Loading type='component' />

  return (
    <Table
      showSorterTooltip={false}
      scroll={{ x: "max-content", y: height }}

      expandable={{
        expandedRowRender: record => <div style={{ margin: 0 }}>
          <div className="head">
            <div className="lbl">
              {t("report.date_updated")}
            </div>
            <div className="val">
              {getCurrentDateTimeByDateString(record.timestamp)}
            </div>
            <div style={{ marginLeft: 10 }} className="lbl">
              {t("report.order_no")}
            </div>
            <div className="val">
              {record.id}
            </div>
            <div style={{ marginLeft: 2, marginTop: -5 }}>
              <Button onClick={async () => { await navigator.clipboard.writeText(record.id) }} ghost><Icon.CopyIcon useDarkMode /></Button>
            </div>
          </div>
          <OrderHistoryReportExpanded tableData={record.trades && record.trades[0] && record.trades} />
        </div>,
      }}

      pagination={false}
      columns={columns}
      dataSource={[...tableData]}
      rowKey={record => `orderHistory_${record.id}`}
    />
  );
}

export default OrderHistoryReport;