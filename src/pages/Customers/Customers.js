import React from "react";
import Page from '../../components/Page';

export const Customers = () => {
  return (
    <Page
      headerProps={{
        title: 'Customers',
      }}
      searchBarProps={{
        placeholder: 'Search by customer\'s name',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      newButtonProps={{
        // onClick: null,
      }}
    >
    </Page>
  );
};

export default Customers;
