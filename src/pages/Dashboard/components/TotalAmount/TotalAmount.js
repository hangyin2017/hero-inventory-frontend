import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import StatisticCard from '../StatisticCard';

const TotalAmount = ({
  loading,
  totalSalesOrderPrice,
  totalPurchaseOrderPrice,
}) => {
  return (
    <StatisticCard title="Total Orders Amount" loading={loading}>
      <Row>
        <Col span={12}>
          <Statistic title="Sales Amount" value={"$" + totalSalesOrderPrice} />
        </Col>
        <Col span={12}>
          <Statistic title="Purchase Amount" value={"$" + totalPurchaseOrderPrice} />
        </Col>
      </Row>
    </StatisticCard>
  );
}

export default TotalAmount;