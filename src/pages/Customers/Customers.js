import React from "react";
import Page from '../../components/Page';
import NewCustomerModal from './components/NewCustomerModal';

export const Customers = () => {
  return (
    <Page
      headerProps={{
        title: 'Customers',
        hasNewButton: true,
      }}
      searchBarProps={{
        placeholder: 'Search by customer\'s name',
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
      Modal={NewCustomerModal}
    />
  );
};

export default Customers;
