import React from 'react';
import { Table } from 'antd';
import salesOrder from '../../../../apis/salesOrders';
import styled from 'styled-components';

const DetailsTableContainer = styled.div`
  margin-top: -120px;
`;

const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const columns = [
  {
    title: "Sold Item Id",
    dataIndex: "soldItemId",
    width: 300,
    sorter: (a, b) => a.soldItemId - b.soldItemId,
  },
  {
    title: "Item Id",
    dataIndex: "itemId",
    width: 100,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: 100,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    width: 100,
  },
];

class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      totalPrice: 0,
    }
  }

    async componentDidMount() {
    const { id } = this.props;
    const result = await salesOrder.get(id);
    const soldItems = result.data.soldItems;
    this.setState({
      dataSource: soldItems,
      totalPrice: result.data.totalPrice,
    });
  }
  render() {
    const { dataSource, totalPrice } = this.state;

    return (
      <DetailsTableContainer>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          scroll={true}
        />
        <TotalAmountContainer>
          <h2>Total（$）</h2>
          <h2>{totalPrice}</h2>
        </TotalAmountContainer>
      </DetailsTableContainer>
    )
  }
}

export default ItemTable;