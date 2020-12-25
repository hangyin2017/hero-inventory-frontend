import React from "react";
import Page from '../../components/Page';
import ROUTES from "../../Routes";
import NewPurchaseOrderModal from './components/NewPurchaseOrderModal';
import purchaseOrder from '../../apis/purchaseOrders';
import fields from './fields';
import OrderDetailModal from './components/OrderDetailModal';

const DEFAULT_COLUMNS = Object.keys(fields).filter(key => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
}));

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
          title: ROUTES.purchaseorders.title,
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
        NewModal={NewPurchaseOrderModal}
        DetailsModal={OrderDetailModal}
        api={purchaseOrder}
      />
    )
  }
}

export default PurchaseOrders;