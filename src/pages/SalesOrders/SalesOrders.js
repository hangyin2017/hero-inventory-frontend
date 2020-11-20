import React from 'react';
import { Input, Table, Button } from 'antd';
import NewOrderModal from './components/NewOrderModal';

class SalesOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrderModalVisible: false,
    }

    this.showNewOrderModal = this.showNewOrderModal.bind(this);
    this.hideNewOrderModal = this.hideNewOrderModal.bind(this);
  }

  showNewOrderModal() {
    this.setState({ newOrderModalVisible: true });
  }

  hideNewOrderModal() {
    this.setState({ newOrderModalVisible: false });
  }

  render() {
    const { newOrderModalVisible } = this.state;

    return (
      <>
        <Button
          onClick={this.showNewOrderModal}
        >
          + New
        </Button>
        <NewOrderModal
          title="Add New Sales Order"
          visible={newOrderModalVisible}
          onSave={this.hideNewOrderModal}
          onCancel={this.hideNewOrderModal}
        />
      </>
    )
  }
}

export default SalesOrders;
