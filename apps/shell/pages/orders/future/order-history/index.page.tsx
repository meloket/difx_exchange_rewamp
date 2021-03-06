import React from "react";
import { Button, Col, DatePicker, Layout, Row, Select, Space, Typography } from 'antd';
import OrderLayout from "../../index.page";
import { WalletWrapper } from "../../../wallet/styled";
import { t } from "i18next";
import { Icon } from "@difx/core-ui";
import FutureOrderHistoryTransaction from "../../../../components/orders/futures/orderHistory";

const { Content } = Layout;

export function FutureOrderHistoryPage() {
  return (
    <OrderLayout>
        <Layout style={{ padding: '24px' }}>
        <Content>
                <WalletWrapper>
                    <Typography.Title level={3}>{t("order.order_history")}</Typography.Title>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <Space>
                                <div>
                                    <DatePicker.RangePicker />
                                </div>
                                <Select defaultValue="coin" size="small" className="input-small">
                                    <Select.Option value="coin">Coin</Select.Option>
                                </Select>
                                <Select defaultValue="Type" size="small" className="input-small">
                                    <Select.Option value="Type">Type</Select.Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col>
                            <Button type="ghost" size="small" className="btn-icon"><Icon.CancelOrderIcon useDarkMode /> Cancel All</Button>
                        </Col>
                    </Row>
                </WalletWrapper>
                {/* Transaction here */}
                <FutureOrderHistoryTransaction />
            </Content>
        </Layout>
    </OrderLayout>
  );
}

export default FutureOrderHistoryPage;
