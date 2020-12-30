import React from 'react';
import GeneralOrderDetailModal from '../../../../components/GeneralOrderDetailModal';
import purchaseOrders from '../../../../apis/purchaseOrders';
import fields from '../../fields';

class OrderDetailModal extends React.Component {

  render() {
    const { onCancel, id, refreshTableData, ...modalProps } = this.props;

    return (
      <GeneralOrderDetailModal 
        {...modalProps}
        onCancel={onCancel}
        id={id}
        refreshTableData={refreshTableData}
        orderApi={purchaseOrders}
        fields={fields}
      />
    )
  }
}

export default OrderDetailModal;