import React from 'react';
import { Input, Table } from 'antd';
import itemApi from '../../apis/item';
import styles from './Inventory.module.less';
import COLUMNS from './COLUMNS';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      searchInput: '',
    }

    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const { data } = await itemApi.getAll();
    this.setState({
      tableData: data
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
          columns={COLUMNS}
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