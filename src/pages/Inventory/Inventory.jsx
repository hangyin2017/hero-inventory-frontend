import React from 'react';
import { Select, Input, Table } from 'antd';
import styles from './Inventory.less';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

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

        <Search placeholder="search for item" />
      </>
    )
  }
}

export default Inventory;