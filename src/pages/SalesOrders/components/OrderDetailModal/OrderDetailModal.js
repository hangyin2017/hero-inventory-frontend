import React from 'react';
import GeneralOrderDetailModal from '../../../../components/GeneralOrderDetailModal';

class OrderDetailModal extends React.Component {

  render() {
    const { onCancel, id, ...modalProps } = this.props;

    return (
      <GeneralOrderDetailModal 
        {...modalProps}
        onCancel={onCancel}
        id={id}
      />
    )
  }
}

export default OrderDetailModal;