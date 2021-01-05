import React from 'react';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import FIELDS from './fields';
import purchaseOrders from '../../../../apis/purchaseOrders';

class NewPurchaseOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onCancel, refreshTableData, refreshDetailsData, ...props } = this.props;
    return (
      <GeneralOrderModal
        {...props}
        onCancel={onCancel}
        FIELDS={FIELDS}
        orderApi={purchaseOrders}
        refreshTableData={refreshTableData}
        refreshDetailsData={refreshDetailsData}
      />
    );
  }

}

export default NewPurchaseOrderModal;