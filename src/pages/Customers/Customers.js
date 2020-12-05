import React from "react";
import Page from '../../components/Page';
import NewCustomerModal from './components/NewCustomerModal';

class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      NewCustomerModalVisible: false,
    }

    this.showNewCustomerModal = this.showNewCustomerModal.bind(this);
    this.hideNewCustomerModal = this.hideNewCustomerModal.bind(this);

  }

  hideNewCustomerModal() {
    this.setState({
      NewCustomerModalVisible:false,
    });
  }

  showNewCustomerModal() {
    this.setState({
      NewCustomerModalVisible:true,
    });
  }

  render() {
    const { NewCustomerModalVisible } = this.state;

    return (
      <Page
        headerProps={{
          title: 'Customers',
          hasNewButton: true,
        }}
        searchBarProps={{
          placeholder: 'Search by customer\'s name',
          // onChange: this.debouncedSearch,
          // onSearch: this.handleSearch,
        }}
        tableProps={{
          // columns: columns,
          // dataSource: tableData,
          // rowKey: 'id',
          pagination: {
            position: ['bottomRight'],
            defaultPageSize: 10,
          },
        }}
        Modal={NewCustomerModal}
      >
        <NewCustomerModal
          title='Add New Customer'
          visible={NewCustomerModalVisible}
          maskClosable={false}
          onCancel={this.hideNewCustomerModal}
          onSave={this.hideNewCustomerModal}
          destroyOnClose={true}
        />
      </Page>
    )
  }    
}

export default Customers;
