import React from 'react';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';
import Header from './components/Header';

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

Modal.Header = Header;

export default Modal;