import React from 'react';
import { Select, Input, Table } from 'antd';
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
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ]

    const mockData = Array(100).fill({}).map((entry, index) => ({
      key: index,
      code: parseInt(Math.random() * 10e5),
      name: `Item${index}`,
      quantity: parseInt(Math.random() * 10e3)
    }))

    this.state = {
      dataSource: mockData,
    }
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