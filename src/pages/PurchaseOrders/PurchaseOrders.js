import React from "react";
import Page from '../../components/Page';
import NewOrderModal from './components/NewOrderModal';

export const PurchaseOrders = () => {
  return (
    <Page
      headerProps={{
        title: 'Purchase Orders',
        hasNewButton: true,
      }}
      searchBarProps={{
        placeholder: 'Search by order number',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      newButtonProps={{
        // onClick: null,
      }}
      Modal={NewOrderModal}
    />
  );
};

export default PurchaseOrders;
