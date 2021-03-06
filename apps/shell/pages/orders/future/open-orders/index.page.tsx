import React from "react";
import { Button, Col, DatePicker, Layout, Row, Select, Space, Typography } from 'antd';
import OrderLayout from "../../index.page";
import { WalletWrapper } from "../../../wallet/styled";
import { t } from "i18next";
import { Icon } from "@difx/core-ui";
import FutureOpenOrderTransaction from "../../../../components/orders/futures/openOrders";

const { Content } = Layout;

export function FutureOpenOrdersPage() {
  return (
    <OrderLayout>
        <Layout style={{ padding: '24px' }}>
        <Content>
                <WalletWrapper>
                    <Typography.Title level={3}>{t("order.open_orders")}</Typography.Title>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <Space>
                                <div>
                                    <DatePicker.RangePicker />
                                </div>
                                <div>
                                <Select defaultValue="coin" size="small" className="input-small">
                                    <Select.Option value="coin">Coin</Select.Option>
                                </Select>
                                </div>
                            </Space>
                        </Col>
                        <Col>
                            <Button type="ghost" size="small" className="btn-icon"><Icon.CancelOrderIcon useDarkMode /> Cancel All</Button>
                        </Col>
                    </Row>
                </WalletWrapper>
                {/* Transaction here */}
                <FutureOpenOrderTransaction />
            </Content>
        </Layout>
    </OrderLayout>
  );
}

export default FutureOpenOrdersPage;
