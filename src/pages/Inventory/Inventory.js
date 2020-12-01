import React from 'react';
import { Table } from 'antd';
import itemApi from '../../apis/items';
import Page from '../../components/Page';
import NewItemModal from './components/NewItemModal';
import ItemDetailModal from './components/ItemDetailModal';
import columns from './columns';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      searchInput: '',
      newItemModalVisible: false,
      itemDetailModalVisible: false,
      rowId: 0,
    }

    this.showNewItemModal = this.showNewItemModal.bind(this);
    this.hideNewItemModal = this.hideNewItemModal.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setRowId = this.setRowId.bind(this);
    this.showItemDetailModal = this.showItemDetailModal.bind(this);
    this.hideItemDetailModal = this.hideItemDetailModal.bind(this);
  }

  async componentDidMount() {
    const { data } = await itemApi.getAll();
    this.setState({
      tableData: data,
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

  hideItemDetailModal() {
    this.setState({
      itemDetailModalVisible: false,
    });
  }

  showItemDetailModal() {
    this.setState({
      itemDetailModalVisible: true,
    });
  }


  setRowId(id) {
    this.setState({
      rowId: id,
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
    const { tableData, newItemModalVisible, itemDetailModalVisible } = this.state;

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
            position: ['topRight', 'bottomRight'],
            defaultPageSize: 10,
          },
          onRow: (record) => {
            return {
              onClick: () => {
                this.setRowId(record.id);
                const { rowId } = this.state.rowId;
                this.showItemDetailModal();
                console.log(record.id);
                console.log(rowId);
              }
            };
          }
        }}
      >
        <NewItemModal
          title="Add New Item"
          visible={newItemModalVisible}
          maskClosable={false}
          onSave={this.hideNewItemModal}
          onCancel={this.hideNewItemModal}
          destroyOnClose={true}
        />
        <ItemDetailModal
          title="Item Detail"
          visible={itemDetailModalVisible}
          maskClosable={false}
          onCancel={this.hideItemDetailModal}
          destroyOnClose={true}
          rowId={this.state.rowId}
        />
      </Page>
    )
  }
}

export default Inventory;