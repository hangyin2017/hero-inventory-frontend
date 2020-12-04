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

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async debouncedSearch({ target }) {
    if(target.timer) clearTimeout(target.timer);
    target.timer = setTimeout(() => this.handleSearch(target.value), 1000);
  }

  async handleSearch(input) {
    const { data } = await items.filter(input);
    this.setState({
      tableData: data
    });
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
          onChange: this.debouncedSearch,
          onSearch: this.handleSearch,
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