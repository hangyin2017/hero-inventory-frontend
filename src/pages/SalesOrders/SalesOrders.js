import React from 'react';
import { Button } from 'antd';
import Page from '../../components/Page';
import NewOrderModal from './components/NewOrderModal';

class SalesOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
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
    const { tableData, newOrderModalVisible } = this.state;

    return (
      <Page
        headerProps={{
          title: 'Sales Orders',
        }}
        searchBarProps={{
          placeholder: 'Search by order number',
          // onChange: this.debouncedSearch,
          // onSearch: this.handleSearch,
        }}
        newButtonProps={{
          onClick: this.showNewOrderModal,
        }}
        tableProps={{
          // columns: columns,
          dataSource: tableData,
          // rowKey: 'id',
          pagination: {
            position: ['topRight', 'bottomRight'],
            defaultPageSize: 10,
          },
        }}
        modalProps={{ Modal: NewOrderModal}}
      >
        {/* <NewOrderModal
          title="Add New Sales Order"
          visible={newOrderModalVisible}
          maskClosable={false}
          onSave={this.hideNewOrderModal}
          onCancel={this.hideNewOrderModal}
          destroyOnClose={true}
        /> */}
      </Page>
    )
  }
}

export default SalesOrders;