import React from 'react';
import { Table, Popconfirm, Button, Modal } from 'antd';
import OrderItemTableRow from './components/OrderedItemTableRow';
import OrderedItemTableCell from './components/OrderItemTableCell';
import Total from './components/Total';

export const EditableContext = React.createContext();
class OrderedItemsTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ITEM DETAILS",
        dataIndex: "DETAILS",
        width: 300,
        editable: true,
      },
      {
        title: "QUANTITY",
        dataIndex: "QUANTITY",
        width: 100,
        editable: true,
      },
      {
        title: "RATE",
        dataIndex: "RATE",
        width: 100,
        editable: true,
      },
      {
        title: "DISCOUNT",
        dataIndex: "DISCOUNT",
        width: 100,
        editable: true,
      },
      {
        title: "AMOUNT",
        dataIndex: "AMOUNT",
        width: 100,
      },
      {
        title: "OPERATION",
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: OrderItemTableRow,
        cell: OrderedItemTableCell,
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
          showModal: this.showModal
        }),
      };
    });

    return (
      <div style={ { width: "80%", margin: "30px auto" } }>
        <Table
          pagination={ false }
          components={ components }
          bordered
          dataSource={ dataSource }
          columns={ columns }
        />
        <div style={{display:'flex',justifyContent:'space-between',paddingTop:20}}>
          <div>
            <button
              onClick={ this.handleAdd }
              type="primary"
              style={ { marginTop: 16 } }
            >
              Add another line
          </button>
          </div>
          <div style={{width: '50%'}}>
            <Total dataSource={this.state.dataSource}/>
          </div>
        </div>
        <Modal
          title="Basic Modal"
          visible={ this.state.visible }
          onCancel={ this.handleCancel }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default OrderedItemsTable;
