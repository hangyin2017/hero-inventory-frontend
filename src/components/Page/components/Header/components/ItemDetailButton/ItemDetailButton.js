import React from 'react';
import { Button } from 'antd';

const ItemDetailButton = ({
  onClick,
}) => {
  return (
    <Button type="primary" onClick={onClick}>
      Detail
    </Button>
  )
};

export default ItemDetailButton;