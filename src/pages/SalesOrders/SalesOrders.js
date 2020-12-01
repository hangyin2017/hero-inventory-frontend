import React from 'react';
import Page from '../../components/Page';
import NewOrderModal from './components/NewOrderModal';

class SalesOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      newOrderModalVisible: false,
    }
  }

  render() {
    const { tableData, newOrderModalVisible } = this.state;

    return (
      <Page
        headerProps={{
          title: 'Sales Orders',
          hasNewButton: true,
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
        Modal={NewOrderModal}
      />
    )
  }
}

export default SalesOrders;