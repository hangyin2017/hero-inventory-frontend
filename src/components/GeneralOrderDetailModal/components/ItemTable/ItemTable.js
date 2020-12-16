import React from 'react';
import { Table } from 'antd';
import salesOrders from '../../../../apis/salesOrders';
import styled from 'styled-components';

const DetailsTableContainer = styled.div`
  margin-top: -120px;
`;

const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

const TotalAmountText = styled.h2`
  margin-right: 30px;
`;
class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      totalPrice: 0,
      columns: [
        {
          title: "Item Name",
          dataIndex: "itemName",
          width: 300,
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
      ]
    }
  }

  async componentDidMount() {
    const { id, orderAPI } = this.props;
    if (orderAPI == salesOrders) {
      const result = await orderAPI.get(id);
      const soldItems = result.data.soldItems;
      this.setState({
        dataSource: soldItems,
        totalPrice: result.data.totalPrice,
      });
    } else {
      const result = await orderAPI.get(id);
      const purchasedItems = result.data.purchasedItems;
      this.setState({
        dataSource: purchasedItems,
        totalPrice: result.data.totalPrice,
      });
    }
  }

  render() {
    const { dataSource, totalPrice, columns } = this.state;

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
          <TotalAmountText>Total</TotalAmountText>
          <h2>${totalPrice}</h2>
        </TotalAmountContainer>
      </DetailsTableContainer>
    )
  }
}

export default ItemTable;