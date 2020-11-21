import React from "react";
import Page from '../../components/Page';

export const Suppliers = () => {
  return(
    <Page
      headerProps={{
        title: 'Suppliers',
      }}
      searchBarProps={{
        placeholder: 'Search by supplier\'s name',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      newButtonProps={{
        // onClick: null,
      }}
    />
  );
};

export default Suppliers;
