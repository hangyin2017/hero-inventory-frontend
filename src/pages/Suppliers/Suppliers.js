import React from 'react';
import Page from '../../components/Page';
import suppliers from '../../apis/suppliers';
import NewSupplierModal from './components/NewSupplierModal';
import SupplierDetailModal from './components/SupplierDetailModal';
import getColumns from '../../utils/getColumns';
import ROUTES from '../../Routes';
import FIELDS from './fields';

const columns = getColumns(FIELDS);

const Suppliers = () => {
  return (
    <Page
      headerProps={{
        title: ROUTES.suppliers.title,
        hasNewButton: true,
        hasSearchBar: true,
      }}
      searchBarProps={{
        placeholder: 'Search by supplier\'s name',
      }}
      tableProps={{
        columns: columns,
        rowKey: 'id',
      }}
      NewModal={NewSupplierModal}
      DetailsModal={SupplierDetailModal}
      api={suppliers}
      FIELDS={FIELDS}
    />
  );
};

export default Suppliers;