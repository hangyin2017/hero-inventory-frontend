import React from 'react';
import GeneralOrderDetailModal from '../../../../components/GeneralOrderDetailModal';
import salesOrders from '../../../../apis/salesOrders';
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
        orderApi={salesOrders}
        fields={fields}
      />
    )
  }
}

export default OrderDetailModal;