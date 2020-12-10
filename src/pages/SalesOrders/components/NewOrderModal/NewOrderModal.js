import React from 'react';
import { Modal } from 'antd';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import SalesorderFields from './SalesorderFields';
import salesOrder from '../../../../apis/salesOrders';

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
        fields={SalesorderFields}
        orderAPI={salesOrder}
      />
    );
  }
}

export default NewOrderModal;