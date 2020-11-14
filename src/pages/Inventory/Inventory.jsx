import React from 'react';
import { Input, Table } from 'antd';
import api from '../../lib/api';
import styles from './Inventory.module.less';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.timer = undefined;

    this.columns = [
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
      dataSource: [],
      searchInput: '',
    }

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSearchBarSearch = this.handleSearchBarSearch.bind(this);
  }

  async componentDidMount() {
    const { data } = await api.getAll('items');
    this.setState({
      dataSource: data
    });
  }

  async handleSearchBarChange(e) {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      const { data } = await api.filter('items', e.target.value);
      this.setState({
        dataSource: data
      });
    }, 1000);
  }

  async handleSearchBarSearch(input) {
    const { data } = await api.filter('items', input);
    this.setState({
      dataSource: data
    });
  }

  render() {
    const { Search } = Input;
    const { dataSource } = this.state;

    return (
      <>
        <Search
          className={styles.search}
          placeholder="Search by item name or code"
          allowClear={true}
          onChange={this.handleSearchBarChange}
          onSearch={this.handleSearchBarSearch}
        />

        <Table
          columns={this.columns}
          dataSource={dataSource}
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