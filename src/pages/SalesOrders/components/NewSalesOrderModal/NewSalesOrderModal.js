import React from 'react';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import SalesorderFields from './SalesorderFields';
import salesOrders from '../../../../apis/salesOrders';

class NewSalesOrderModal extends React.Component {
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
        orderAPI={salesOrders}
      />
    );
  }
}

export default NewSalesOrderModal;