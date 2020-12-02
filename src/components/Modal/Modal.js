import React from 'react';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

const Modal = ({
  title,
  onCancel,
  ...restProps
}) => {
  return (
    <AntdModal
      maskClosable={false}
      destroyOnClose={true}
      title={title}
      onCancel={onCancel}
      {...restProps}
    />
  )
};

export default Modal;