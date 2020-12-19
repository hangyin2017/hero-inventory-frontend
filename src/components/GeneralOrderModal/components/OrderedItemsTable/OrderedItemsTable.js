import React from 'react';
import { Table, Popconfirm, Button } from 'antd';
import OrderItemsTableRow from './components/OrderedItemsTableRow';
import OrderedItemsTableCell from './components/OrderItemsTableCell';
import Total from './components/Total';
import styled from 'styled-components';
import COLUMNS from './Columns';

export const EditableContext = React.createContext();

const ItemTableWrapper = styled.div`
  width: 100%;
  margin: 30px auto;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const TableAmountWrapper = styled.div`
  width: 50%;
`;

const defaultData = Object.keys(COLUMNS).reduce((obj, key) => ({
    ...obj,
    [key]: COLUMNS[key].default,
  }), {});
defaultData.key = 1;

class OrderedItemsTable extends React.Component {
  constructor(props) {
    super(props);

    console.log(defaultData);
    this.state = {
      dataSource: [defaultData],
      visible: false,
      count: 1,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      DETAILS: "Type or click to select an item",
      QUANTITY: 1,
      data: {},
      RATE: 0.0,
      DISCOUNT: 0,
      AMOUNT: 0,
      flag: '%'
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  componentDidMount() {
    if (this.props.initialData) {
      let dataSource = this.props.initialData.map(val => ({
        id: val.itemId,
        key: val.itemId,
        DETAILS: val.itemName,
        QUANTITY: val.quantity,
        RATE: val.rate,
        DISCOUNT: 0,
        AMOUNT: val.quantity * val.rate,
        flag: '%',
      }))
      this.setState({ dataSource })
    }
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  //数据改变 就传数据
  componentDidUpdate(prevProps, prevState) {
    const { dataSource } = this.state;
    const { getItems } = this.props;
    if (dataSource != prevState.dataSource) {
      getItems(dataSource);
    }
  };

  render() {
    const { dataSource } = this.state;
    const { getTotalPrice } = this.props;
    const components = {
      body: {
        row: OrderItemsTableRow,
        cell: OrderedItemsTableCell,
      },
    };
    const columns = Object.keys(COLUMNS).map((key) => {
      if (!COLUMNS[key].editable) {
        return {
          ...COLUMNS[key],
          dataIndex: key,
        };
      }
      return {
        ...COLUMNS[key],
        dataIndex: key,
        onCell: (record) => ({
          record,
          editable: COLUMNS[key].editable,
          dataIndex: key,
          title: COLUMNS[key].title,
          handleSave: this.handleSave,
          handleAdd: this.handleAdd,
        }),
      };
    });

    return (
      <ItemTableWrapper>
        <Table
          pagination={false}
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <BottomWrapper>
          <Button onClick={this.handleAdd}>
            Add Another Line
          </Button>
          <TableAmountWrapper>
            <Total
              dataSource={dataSource}
              getTotalPrice={getTotalPrice}
            />
          </TableAmountWrapper>
        </BottomWrapper>
      </ItemTableWrapper>
    );
  }
}

export default OrderedItemsTable;
