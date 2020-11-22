import React from 'react';
import { Table } from 'antd';
import itemApi from '../../apis/items';
import Page from '../../components/Page';
import columns from './columns';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      searchInput: '',
    }

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const { data } = await itemApi.getAll();
    this.setState({
      tableData: data
    });
  }
  
  async debouncedSearch({ target }) {
    if(target.timer) clearTimeout(target.timer);
    target.timer = setTimeout(() => this.handleSearch(target.value), 1000);
  }

  async handleSearch(input) {
    const { data } = await itemApi.filter(input);
    this.setState({
      tableData: data
    });
  }

  render() {
    const { tableData } = this.state;

    return (
      <Page
        headerProps={{
          title: 'Inventory',
        }}
        searchBarProps={{
          placeholder: 'Search by item name or SKU',
          onChange: this.debouncedSearch,
          onSearch: this.handleSearch,
        }}
        newButtonProps={{
          // onClick: null,
        }}
        tableProps={{
          columns: columns,
          dataSource: tableData,
          rowKey: 'id',
          pagination: {
            position: ['topRight', 'bottomRight'],
            defaultPageSize: 10,
          },
        }}
      />
    )
  }
}

export default Inventory;