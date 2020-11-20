import React from 'react';
import { Button } from 'antd';
import Page from '../../components/Page';
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
      <Page title="Sales Orders">
        <Button type="primary" onClick={this.showNewOrderModal}>
          + New
        </Button>
        <NewOrderModal
          title="Add New Sales Order"
          visible={newOrderModalVisible}
          onSave={this.hideNewOrderModal}
          onCancel={this.hideNewOrderModal}
          destroyOnClose={true}
        />
      </Page>
    )
  }
}

export default SalesOrders;
