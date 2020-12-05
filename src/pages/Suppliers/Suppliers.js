import React from "react";
import Page from '../../components/Page';
import NewSupplierModal from './components/NewSupplierModal';

export const Suppliers = () => {
  return(
    <Page
      headerProps={{
        title: 'Suppliers',
        hasNewButton: true,
      }}
      searchBarProps={{
        placeholder: 'Search by supplier\'s name',
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
      Modal={NewSupplierModal}
    />
  );
};

export default Suppliers;
