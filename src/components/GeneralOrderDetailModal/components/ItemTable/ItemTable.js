import React from 'react';
import { Table } from 'antd';
import salesOrder from '../../../../apis/salesOrders';

const columns = [
  {
    title: "Items & Description",
    dataIndex: "DETAILS",
    width: 300,
  },
  {
    title: "Quantity",
    dataIndex: "QUANTITY",
    width: 100,
  },
  {
    title: "Rate",
    dataIndex: "RATE",
    width: 100,
  },
  {
    title: "Amount",
    dataIndex: "AMOUNT",
    width: 100,
  },
];

class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          DETAILS: "",
          QUANTITY: "",
          RATE: "",
          AMOUNT: "",
        },
      ],
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const result = await salesOrder.get(id);
    const orderedItems = result.data.soldItems;
    const itemId = orderedItems.map((key) => key['itemId']);
    const quantity = orderedItems.map((key) => key['quantity']);
    const rate = orderedItems.map((key) => key['rate']);

    this.setState({
      dataSource: [
        {
          DETAILS: itemId[0],
          QUANTITY: quantity[0],
          RATE: rate[0],
          AMOUNT: quantity[0] * rate[0],
        }
      ],
    });
  }

  render() {
    const { dataSource } = this.state;

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        scroll={true}
      />
    )
  }
}

export default ItemTable;