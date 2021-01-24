import React from 'react';
import items from '../../apis/items';
import Page from '../../components/Page';
import NewItemModal from './components/NewItemModal';
import ItemDetailModal from './components/ItemDetailModal';
import getColumns from '../../utils/getColumns';
import ROUTES from '../../routes.ts';
import FIELDS from './fields';

const columns = getColumns(FIELDS);

const Inventory = () => {
  return (
    <Page
      headerProps={{
        title: ROUTES.inventory.title,
        hasNewButton: true,
        hasSearchBar: true,
      }}
      searchBarProps={{
        placeholder: 'Search by item name or SKU',
      }}
      tableProps={{
        columns: columns,
        rowKey: 'id',
      }}
      NewModal={NewItemModal}
      DetailsModal={ItemDetailModal}
      api={items}
      FIELDS={FIELDS}
    />
  );
};

export default Inventory;