import React from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import OrderItemsTableRow from './components/OrderedItemsTableRow';
import OrderedItemsTableCell from './components/OrderItemsTableCell';
import Total from './components/Total';
import styled from 'styled-components';

export const EditableContext = React.createContext();

const ItemTableWrapper = styled.div`
  width: 100%;
  margin: 30px auto;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const StyledButton = styled.button`
  margin-top: 16px;
`;

const TableAmountWrapper = styled.div`
  width: 50%;
`;

class OrderedItemsTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Item Details",
        dataIndex: "DETAILS",
        width: 300,
        editable: true,
      },
      {
        title: "Quantity",
        dataIndex: "QUANTITY",
        width: 100,
        editable: true,
      },
      {
        title: "Rate",
        dataIndex: "RATE",
        width: 100,
        editable: true,
      },
      {
        title: "Discount",
        dataIndex: "DISCOUNT",
        width: 100,
        editable: true,
      },
      {
        title: "Amount",
        dataIndex: "AMOUNT",
        width: 100,
      },
      {
        title: "Operation",
        width: 100,
        dataIndex: "OPERATION",
        render: (text, record) =>
          this.state.dataSource.length > 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={ () => this.handleDelete(record.key) }
            >
              <Button>Delete</Button>
            </Popconfirm>
          ) : "Can't not delete",
      },
    ];
    
    this.state = {
      dataSource: [
        {
          id:0,
          key: "0",
          DETAILS: "Type or click to select an item",
          QUANTITY: 1,
          RATE: 0.0,
          DISCOUNT: 0,
          AMOUNT: 0,
          flag: '%'
        },
      ],
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
  componentDidUpdate (prevProps,prevState) {
    const { dataSource } = this.state;
    const { getItems } = this.props;
    if(dataSource != prevState.dataSource){
      getItems(dataSource);
    }
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: OrderItemsTableRow,
        cell: OrderedItemsTableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          handleAdd: this.handleAdd,
        }),
      };
    });

    return (
      <ItemTableWrapper>
        <Table
          pagination={ false }
          components={ components }
          bordered
          dataSource={ dataSource }
          columns={ columns }
        />
        <BottomWrapper>
          <div>
            <StyledButton
              type='button'
              onClick={ this.handleAdd }
            >
              Add Another Line
            </StyledButton>
          </div>
          <TableAmountWrapper>
            <Total dataSource={ dataSource } />
          </TableAmountWrapper>
        </BottomWrapper>
      </ItemTableWrapper> 
    );
  }
}

export default OrderedItemsTable;
