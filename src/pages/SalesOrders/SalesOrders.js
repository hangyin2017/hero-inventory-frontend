import React from 'react';
import Page from '../../components/Page';
import NewSalesOrderModal from './components/NewSalesOrderModal';
import PAGES from '../../pages';
import salesOrders from '../../apis/salesOrders';
import fields from './fields';
import OrderDetailModal from './components/OrderDetailModal';

const DEFAULT_COLUMNS = Object.keys(fields).filter(key => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
}));

class SalesOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    }
  }

  render() {

    return (
      <Page
        headerProps={{
          title: PAGES.salesorders.title,
          hasNewButton: true,
          hasSearchBar: true,
        }}
        searchBarProps={{
          placeholder: 'Search by order number',
          // onChange: this.debouncedSearch,
          // onSearch: this.handleSearch,
        }}
        tableProps={{
          columns: columns,
          rowKey: 'id',
        }}
        NewModal={NewSalesOrderModal}
        DetailsModal={OrderDetailModal}
        api={salesOrders}
      />
    )
  }
}

export default SalesOrders;