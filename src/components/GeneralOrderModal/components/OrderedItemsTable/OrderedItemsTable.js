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

const Top = styled.div`
  position: relative;
  z-index: 1;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const TableAmountWrapper = styled.div`
  width: 50%;
`;

let defaultData = Object.keys(COLUMNS).reduce((obj, key) => ({
    ...obj,
    [key]: COLUMNS[key].default,
  }), {});
defaultData = {
  ...defaultData,
  key: 0,
  flag: '%',
};

class OrderedItemsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [defaultData],
      visible: false,
      count: 1,
    };

    this.handleDelete = this.handleDelete.bind(this);
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
      ...defaultData,
      key: count,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const { initialItemsData } = this.props;
    if (initialItemsData) {
      const dataSource = initialItemsData.map(val => ({
        ...val,
        key: val.soldItemId || val.purchasedItemId,
        amount: val.quantity * val.rate,
      }));

      this.setState({ dataSource });
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
    const { getPrice, initialData, formRef } = this.props;
    const applyGst = formRef.current?.getFieldValue('applyGst') || false;

    const components = {
      body: {
        row: OrderItemsTableRow,
        cell: OrderedItemsTableCell,
      },
    };

    const columns = Object.keys(COLUMNS).map((key) => {
      return {
        ...COLUMNS[key],
        dataIndex: key,
        onCell: (record) => ({
          record,
          editable: COLUMNS[key].editable,
          dataIndex: key,
          title: COLUMNS[key].title,
          rowCount: dataSource.length,
          handleSave: this.handleSave,
          handleAdd: this.handleAdd,
          handleDelete: this.handleDelete,
        }),
      };
    });

    return (
      <ItemTableWrapper>
        <Top>
          <Table
            pagination={false}
            components={components}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Top>
        <Bottom>
          <Button onClick={this.handleAdd}>
            Add Another Line
          </Button>
          <TableAmountWrapper>
            <Total
              dataSource={dataSource}
              applyGst={applyGst}
              getPrice={getPrice}
              initialData={initialData}
            />
          </TableAmountWrapper>
        </Bottom>
      </ItemTableWrapper>
    );
  }
}

export default OrderedItemsTable;
