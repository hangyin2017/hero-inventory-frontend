import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const ItemCounts = ({
  itemCount,
  lowStockItemCount,
}) => {
  return (
    <Card title="Stock Overview" style={cardStyle} hoverable={true}>
      <Row>
        <Col span={12}>
          <Statistic title="All Items" value={itemCount} />
        </Col>
        <Col span={12}>
          <Statistic title="Low Stock Items" value={lowStockItemCount}  valueStyle={{ color: '#cf1322' }} />
        </Col>
      </Row>
    </Card>
  );
};

export default ItemCounts;