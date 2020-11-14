import React from 'react';
import { Input, Table } from 'antd';
import api from '../../lib/api';
import styles from './Inventory.module.less';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.timer = undefined;

    this.COLUMNS = [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Categary",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Supplier",
        dataIndex: "supplier",
        key: "supplier",
      },
      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: "Selling Price",
        dataIndex: "standardPrice",
        key: "standardPrice",
      },
      {
        title: "Cost",
        dataIndex: "cost",
        key: "cost",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ]

    this.state = {
      tableData: [],
      searchInput: '',
    }

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const { data } = await api.getAll('items');
    this.setState({
      tableData: data
    });
  }
  
  async debouncedSearch({ target }) {
    if(target.timer) clearTimeout(target.timer);
    target.timer = setTimeout(() => this.handleSearch(target.value), 1000);
  }

  async handleSearch(input) {
    const { data } = await api.filter('items', input);
    this.setState({
      tableData: data
    });
  }

  render() {
    const { Search } = Input;
    const { tableData } = this.state;

    return (
      <>
        <Search
          className={styles.search}
          placeholder="Search by item name or SKU"
          allowClear={true}
          onChange={this.debouncedSearch}
          onSearch={this.handleSearch}
        />

        <Table
          columns={this.COLUMNS}
          dataSource={tableData}
          rowKey={'id'}
          pagination={{
            position: ['topRight', 'bottomRight'],
            defaultPageSize: 10,
          }}  
        />
      </>
    )
  }
}

export default Inventory;