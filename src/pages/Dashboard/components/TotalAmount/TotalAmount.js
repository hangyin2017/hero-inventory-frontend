import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const TotalAmount = ({
  totalSalesOrderPrice,
  totalPurchaseOrderPrice,
}) => {
  return (
    <Card title="Total Orders Amount" style={cardStyle} hoverable={true}>
      <Row>
        <Col span={12}>
          <Statistic title="Sales Amount" value={"$" + totalSalesOrderPrice} />
        </Col>
        <Col span={12}>
          <Statistic title="Purchase Amount" value={"$" + totalPurchaseOrderPrice} />
        </Col>
      </Row>
    </Card>
  );
}

export default TotalAmount;