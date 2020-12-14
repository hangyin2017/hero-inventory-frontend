import React from 'react';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import PurchaseorderFields from './PurchaseorderFields';
import purchaseOrders from '../../../../apis/purchaseOrders';

class NewPurchaseOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onCancel, ...props } = this.props;
    return (
      <GeneralOrderModal
        {...props}
        onCancel={onCancel}
        fields={PurchaseorderFields}
        orderAPI={purchaseOrders}
      />
    );
  }

}

export default NewPurchaseOrderModal;