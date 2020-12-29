import React from 'react';
import { Col, Row, Statistic } from 'antd';
import StatisticCard from '../StatisticCard';

const OrderCounts = ({
  loading,
  salesOrderCount,
  purchaseOrderCount,
}) => {
  return (
    <StatisticCard title="Orders Overview" loading={loading}>
      <Row>
        <Col span={12}>
          <Statistic title="Sales Orders" value={salesOrderCount} />
        </Col>
        <Col span={12}>
          <Statistic title="Purchase Orders" value={purchaseOrderCount} />
        </Col>
      </Row>
    </StatisticCard>
  );
};

export default OrderCounts;