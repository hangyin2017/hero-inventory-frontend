import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const OrderCounts = ({
  salesOrderCount,
  purchaseOrderCount,
}) => {
  return (
    <Card title="Orders Overview" style={cardStyle} hoverable={true}>
      <Row>
        <Col span={12}>
          <Statistic title="Sales Orders" value={salesOrderCount} />
        </Col>
        <Col span={12}>
          <Statistic title="Purchase Orders" value={purchaseOrderCount} />
        </Col>
      </Row>
    </Card>
  );
};

export default OrderCounts;