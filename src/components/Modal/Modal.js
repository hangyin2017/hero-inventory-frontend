import React from 'react';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

const Modal = ({
  title,
  hideModal,
  ...restProps
}) => {
  return (
    <AntdModal
      maskClosable={false}
      destroyOnClose={true}
      title={title}
      onCancel={hideModal}
      {...restProps}
    />
  )
};

export default Modal;