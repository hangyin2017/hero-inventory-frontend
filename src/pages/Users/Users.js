import React from "react";
import Page from '../../components/Page';
import NewUserModal from './components/NewUserModal';

const Users = () => {
  return (
    <Page
      headerProps={{
        title: 'Users & Roles',
        hasNewButton: true,
      }}
      searchBarProps={{
        placeholder: 'Search by user\'s name',
        // onChange: this.debouncedSearch,
        // onSearch: this.handleSearch,
      }}
      tableProps={{
        // columns: columns,
        // dataSource: tableData,
        // rowKey: 'id',
        pagination: {
          position: ['bottomRight'],
          defaultPageSize: 10,
        },
      }}
      Modal={NewUserModal}
    />
  );
};

export default Users;
