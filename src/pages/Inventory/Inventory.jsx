import React from 'react';
import { Select, Input, Table } from 'antd';
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
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ]

    this.state = {
      dataSource: [
        {
          key: '1',
          code: 'item111',
          name: 'vitamin',
          quantity: 122,
        },
        {
          key: '2',
          code: 'item222',
          name: 'fomular',
          quantity: 31,
        },
      ]
    }
  }

  render() {
    const { Search } = Input;

    return (
      <>
        <div className={styles.selectEntries}>
          <span>Show</span>
          <Select defualtValue="20">
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </Select>
          <span>entries each page</span>
        </div>

        <Search className={styles.search} placeholder="search for item" />

        <Table columns={this.columns} dataSource={this.state.dataSource}/>
      </>
    )
  }
}

export default Inventory;