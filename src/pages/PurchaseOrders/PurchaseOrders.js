import React from "react";
import Page from '../../components/Page';

export const PurchaseOrders = () => {
  return (
    <Page
      headerProps={{
        title: 'Purchase Orders',
      }}
      searchBarProps={{
        placeholder: 'Search by order number',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      newButtonProps={{
        // onClick: null,
      }}
    />
  );
};

export default PurchaseOrders;
