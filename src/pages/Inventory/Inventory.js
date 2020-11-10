import React from 'react';
import { Select, Input, Table } from 'antd';
import axios from 'axios';
import styles from './Inventory.module.less';

const DEFAULT_ENTRIES_PER_PAGE = 20;

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

    // const mockData = Array(100).fill({}).map((entry, index) => ({
    //   key: index,
    //   code: parseInt(Math.random() * 10e5),
    //   name: `Item${index}`,
    //   quantity: parseInt(Math.random() * 10e3)
    // }))

    this.state = {
      dataSource: [],
    }
  }

  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/item').then(res => res.data);
    this.setState({
      dataSource: data
    });
  }

  handleEntryChange(value) {
    this.setState({
      entriesPerPage: value
    });
  }

  render() {
    const { Search } = Input;

    return (
      <>
        <Search className={styles.search} placeholder="search for item" />

        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
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