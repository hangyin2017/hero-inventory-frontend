import React from 'react';
import GeneralOrderDetailModal from '../../../../components/GeneralOrderDetailModal';

class OrderDetailModal extends React.Component {

  render() {
    const { onCancel, id, refreshTableData, ...modalProps } = this.props;

    return (
      <GeneralOrderDetailModal 
        {...modalProps}
        onCancel={onCancel}
        id={id}
        refreshTableData={refreshTableData}
      />
    )
  }
}

export default OrderDetailModal;