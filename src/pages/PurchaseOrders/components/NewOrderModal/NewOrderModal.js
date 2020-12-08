import React from 'react';
import { Modal, Spin } from 'antd';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import PurchaseorderFields from './PurchaseorderFields';
import purchaseOrder from '../../../../apis/purchaseOrders';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onCancel, loading, error, fetch, ...props } = this.props;
    return (
      <Modal
        {...props}
        onCancel={onCancel}
        footer={null}
        {...props}
        title={'Add New Purchase Order'}
        onCancel={onCancel}
        width={1000}
      >
        <GeneralOrderModal
          onCancel={onCancel}
          fields={PurchaseorderFields}
          orderAPI={purchaseOrder}
        />
      </Modal>
    );
  }

}

export default NewOrderModal;