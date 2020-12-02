import React from 'react';
import items from '../../apis/items';
import Page from '../../components/Page';
import NewItemModal from './components/NewItemModal';
import ItemDetailModal from './components/ItemDetailModal';
import columns from './columns';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      editing: false,
      newItemModalVisible: false,
      itemDetailModalVisible: false,
      rowId: '',
    }

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setRowId = this.setRowId.bind(this);
    this.showItemDetailModal = this.showItemDetailModal.bind(this);
    this.hideItemDetailModal = this.hideItemDetailModal.bind(this);
    this.hideNewItemModal = this.hideNewItemModal.bind(this);
    this.setEditing = this.setEditing.bind(this);
  }

  async componentDidMount() {
    const { data } = await items.getAll();
    this.setState({
      tableData: data,
    });
    
    // const itemData = await items.get(1);
    // this.setState({ data: itemData.data });
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


  setRowId = (id) => {
    this.setState({
      rowId: id}, ()=>{
        this.showItemDetailModal();
      }
    );
  }

  setEditing = (editing) => {
    this.setState({
      editing,
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
    const { tableData, newItemModalVisible, itemDetailModalVisible, rowId, editing } = this.state;

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
        newButtonProps={{
          onClick: this.showNewItemModal,
        }}
        tableProps={{
          columns: columns,
          dataSource: tableData,
          rowKey: 'id',
          pagination: {
            position: ['bottomRight'],
            defaultPageSize: 10,
          },
          // onRow: (record) => {
          //   return {
          //     onClick: () => {
          //       this.setRowId(record.id);
          //     }
          //   };
          // }
        }}
        NewItemModal={NewItemModal}
        DetailsModal={ItemDetailModal}
      >
        <NewItemModal 
          footer={null}
          maskClosable={false}
          visible={newItemModalVisible}
          // showModal={showModal}
          hideModal={this.hideNewItemModal}
          editing={editing}
          data={this.state.data}
        />
        {/* <NewItemModal
          title="Add New Item"
          visible={newItemModalVisible}
          maskClosable={false}
          onSave={this.hideNewItemModal}
          onCancel={this.hideNewItemModal}
          destroyOnClose={true}
        /> */}
        {/* <ItemDetailModal
          visible={itemDetailModalVisible}
          // visible
          onCancel={this.hideItemDetailModal}
          rowId={this.state.rowId}
          setEditing={this.setEditing}
        /> */}
      </Page>
    )
  }
}

export default Inventory;