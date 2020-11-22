import React from "react";
import Page from '../../components/Page';

const Users = () => {
  return (
    <Page
      headerProps={{
        title: 'Users & Roles',
      }}
      searchBarProps={{
        placeholder: 'Search by customer\'s name',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      newButtonProps={{
        // onClick: null,
      }}
    />
  );
};

export default Users;
