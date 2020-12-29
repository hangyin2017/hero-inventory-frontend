import React from 'react';
import { Card, Spin } from 'antd';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const StatisticCard = ({
  title,
  loading,
  children,
}) => {
  return (
    <Card title={title} style={cardStyle} hoverable={true}>
      <Spin spinning={loading}>
        {children}
      </Spin>
    </Card>
  );
}

export default StatisticCard;