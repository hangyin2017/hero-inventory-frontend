import React from 'react';
import { Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Lazy = () => {
  return (
    <div>
      <h1>Lazy component</h1>
      <LoadingOutlined spin/>
      <Pagination type="primary">button</Pagination>
    </div>
  );
};

export default Lazy;