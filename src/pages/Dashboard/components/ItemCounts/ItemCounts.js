import React from 'react';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import StatisticCard from '../StatisticCard';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const ItemCounts = ({
  loading,
  itemCount,
  lowStockItemCount,
}) => {
  return (
    <StatisticCard title="Stock Overview" loading={loading}>
      <Spin spinning={loading}>
        <Row>
          <Col span={12}>
            <Statistic title="All Items" value={itemCount} />
          </Col>
          <Col span={12}>
            <Statistic title="Low Stock Items" value={lowStockItemCount}  valueStyle={{ color: '#cf1322' }} />
          </Col>
        </Row>
      </Spin>
    </StatisticCard>
  );
};

export default ItemCounts;