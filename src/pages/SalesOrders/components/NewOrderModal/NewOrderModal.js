import React from 'react';
import { Modal, Spin } from 'antd';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import SalesorderFields from './SalesorderFields';
import salesOrder from '../../../../apis/salesOrders';

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
        title={'Add New Sales Order'}
        onCancel={onCancel}
        width={1000}
      >
        <GeneralOrderModal
          onCancel={onCancel}
          fields={SalesorderFields}
          orderAPI={salesOrder}
        />
      </Modal>
    );
  }
}

export default NewOrderModal;