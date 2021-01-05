import React from "react";
import Page from '../../components/Page';
import ROUTES from "../../Routes";
import NewPurchaseOrderModal from './components/NewPurchaseOrderModal';
import purchaseOrder from '../../apis/purchaseOrders';
import getColumns from '../../utils/getColumns';
import FIELDS from './fields';
import OrderDetailModal from './components/OrderDetailModal';

const columns = getColumns(FIELDS);

const PurchaseOrders = () => {
  return (
    <Page
      headerProps={{
        title: ROUTES.purchaseorders.title,
        hasNewButton: true,
        hasSearchBar: true,
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
      FIELDS={FIELDS}
    />
  );
};

export default PurchaseOrders;