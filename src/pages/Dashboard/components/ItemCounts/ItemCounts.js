import React from 'react';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import StatisticCard from '../StatisticCard';

const ItemCounts = ({
  loading,
  itemCount,
  lowStockItemCount,
}) => {
  return (
    <StatisticCard title="Stock Overview" loading={loading}>
      <Row>
        <Col span={12}>
          <Statistic title="All Items" value={itemCount} />
        </Col>
        <Col span={12}>
          <Statistic title="Low Stock Items" value={lowStockItemCount}  valueStyle={{ color: '#cf1322' }} />
        </Col>
      </Row>
    </StatisticCard>
  );
};

export default ItemCounts;