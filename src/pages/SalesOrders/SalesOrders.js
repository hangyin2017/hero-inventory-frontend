import React from 'react';
import Page from '../../components/Page';
import NewOrderModal from './components/NewOrderModal';
import PAGES from '../../pages';
import salesOrders from '../../apis/salesOrders';

class SalesOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    }
  }

  render() {
    const { tableData } = this.state;

    return (
      <Page
        headerProps={{
          title: PAGES.salesorders.title,
          hasNewButton: true,
        }}
        searchBarProps={{
          placeholder: 'Search by order number',
          // onChange: this.debouncedSearch,
          // onSearch: this.handleSearch,
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
        NewModal={NewOrderModal}
        api={salesOrders}
      />
    )
  }
}

export default SalesOrders;