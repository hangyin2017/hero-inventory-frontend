import { Card, Col, Row, Statistic } from "antd";
import React from "react";



export const ItemCounts = () => {

  const cardStyle = {
    textAlign: 'center',
  };

  return (
    <Row>
      <Col span={12}>
        <Card title="Product Details" style={cardStyle} hoverable={true}>
            <Row>
              <Col span={12}>
                <Statistic title="All Items" value={123} />
                </Col>
              <Col span={12}>
                <Statistic title="Low Stock Items" value={123} />
              </Col>
            </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ItemCounts;