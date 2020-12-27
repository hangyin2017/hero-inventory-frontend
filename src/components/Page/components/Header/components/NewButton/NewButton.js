import React from 'react';
import { Button } from 'antd';

const NewButton = ({
  onClick,
  disabled,
}) => {
  return (
    <Button type="primary" onClick={onClick} disabled={disabled}>
      + New
    </Button>
  )
};

export default NewButton;