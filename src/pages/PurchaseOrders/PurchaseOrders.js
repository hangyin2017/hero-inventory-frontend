import React from "react";
import Page from '../../components/Page';
import PAGES from "../../pages";
import NewOrderModal from './components/NewOrderModal';

class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      newOrderModalVisible: false,
    }
  }

  render() {
    const { tableData } = this.state;

    return (
      <Page
        headerProps={{
          title: PAGES.purchaseorders.title,
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
        Modal={NewOrderModal}
      />
    )
  }
}

export default PurchaseOrders;