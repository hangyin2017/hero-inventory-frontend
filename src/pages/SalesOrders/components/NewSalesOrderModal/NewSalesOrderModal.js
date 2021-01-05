import React from 'react';
import GeneralOrderModal from '../../../../components/GeneralOrderModal';
import FIELDS from './fields';
import salesOrders from '../../../../apis/salesOrders';

class NewSalesOrderModal extends React.Component {
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
        orderApi={salesOrders}
        refreshTableData={refreshTableData}
        refreshDetailsData={refreshDetailsData}
      />
    );
  }
}

export default NewSalesOrderModal;