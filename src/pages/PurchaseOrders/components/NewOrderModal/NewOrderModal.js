import React from 'react';
import { Modal } from 'antd';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import PurchaseorderFields from './PurchaseorderFields';
import purchaseOrder from '../../../../apis/purchaseOrders';

class NewOrderModal extends React.Component {
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
        orderAPI={purchaseOrder}
      />
    );
  }

}

export default NewOrderModal;