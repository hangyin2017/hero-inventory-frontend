import React from 'react';
import { Select, Input, Table } from 'antd';
import api from '../../lib/api';
import styles from './Inventory.module.less';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.COLUMNS = [
      {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Categary",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Manufacturer",
        dataIndex: "manufacturer",
        key: "manufacturer",
      },
      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: "Selling Price",
        dataIndex: "sellingPrice",
        key: "sellingPrice",
      },
      {
        title: "Cost Price",
        dataIndex: "costPrice",
        key: "costPrice",
      },
      {
        title: "Physical Stock",
        dataIndex: "physicalStock",
        key: "physicalStock",
      },
      {
        title: "Created Time",
        dataIndex: "createdTime",
        key: "createdTime",
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