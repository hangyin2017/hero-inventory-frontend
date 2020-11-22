import React from 'react';
import { Button } from 'antd';

const NewButton = ({
  onClick,
}) => {
  return (
    <Button type="primary" onClick={onClick}>
      + New
    </Button>
  )
};

export default NewButton;