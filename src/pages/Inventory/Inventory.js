import React from 'react';
import items from '../../apis/items';
import Page from '../../components/Page';
import NewItemModal from './components/NewItemModal';
import ItemDetailModal from './components/ItemDetailModal';
import fields from './fields';

const DEFAULT_COLUMNS = Object.keys(fields).filter((key) => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
}));

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Page
        headerProps={{
          title: 'Inventory',
          hasNewButton: true,
        }}
        searchBarProps={{
          placeholder: 'Search by item name or SKU',
        }}
        tableProps={{
          columns: columns,
          rowKey: 'id',
        }}
        NewItemModal={NewItemModal}
        DetailsModal={ItemDetailModal}
        api={items}
      />
    )
  }
}

export default Inventory;