import React from "react";
import Page from '../../components/Page';
import PAGES from "../../pages";
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
          title: PAGES.purchaseorders.title,
          hasNewButton: true,
        }}
        searchBarProps={{
          placeholder: 'Search by order number',
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