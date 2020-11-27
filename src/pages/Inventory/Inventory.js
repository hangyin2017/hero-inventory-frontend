import React from 'react';
import { Table } from 'antd';
import items from '../../apis/items';
import Page from '../../components/Page';
import NewItemModal from './components/NewItemModal';
import columns from './columns';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      searchInput: '',
      newItemModalVisible: true,
    }

    this.showNewItemModal = this.showNewItemModal.bind(this);
    this.hideNewItemModal = this.hideNewItemModal.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const { data } = await items.getAll();
    this.setState({
      tableData: data
    });
  }
  
  hideNewItemModal() {
    this.setState({
      newItemModalVisible: false,
    });
  }

  showNewItemModal() {
    this.setState({
      newItemModalVisible: true,
    });
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
    const { tableData, newItemModalVisible } = this.state;

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
          onClick: this.showNewItemModal,
        }}
        tableProps={{
          columns: columns,
          dataSource: tableData,
          rowKey: 'id',
          pagination: {
            // position: ['topRight', 'bottomRight'],
            // defaultPageSize: 10,
          },
        }}
        // style={newItemModalVisible && { overflow: hidden }}
        style
      >
        <NewItemModal
          title="Add New Item"
          visible={newItemModalVisible}
          // maskClosable={false}
          onSave={this.hideNewItemModal}
          onCancel={this.hideNewItemModal}
          // destroyOnClose={true}
        />
      </Page>
    )
  }
}

export default Inventory;