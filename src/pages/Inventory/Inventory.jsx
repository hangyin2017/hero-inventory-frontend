import React from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';
import styles from './Inventory.module.less';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

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
        title: "Standard Price",
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
  }

  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/item').then(res => res.data);
    this.setState({
      dataSource: data
    });
  }

  async handleSearchBarChange(input) {
    const data = await axios.get(`http://localhost:8080/item/search?name=${input}`).then(res => res.data);
    this.setState({
      // searchInput: input
      dataSource: data
    });
  }

  render() {
    const { Search } = Input;
    const { dataSource, searchInput} = this.state;

    return (
      <>
        <Search className={styles.search} placeholder="Search by item name" onSearch={this.handleSearchBarChange} />

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