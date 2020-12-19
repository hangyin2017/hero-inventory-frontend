import React from 'react';
import { Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const COLUMNS =  {
  itemName: {
    title: "Item Details",
    width: 300,
    editable: true,
    default: "Type or click to select an item",
  },
  quantity: {
    title: "Quantity",
    width: 100,
    editable: true,
    default: 1,
  },
  rate: {
    title: "Rate",
    width: 100,
    editable: true,
    default: 0.0,
  },
  discount: {
    title: "Discount",
    width: 150,
    editable: true,
    default: 0,
  },
  amount: {
    title: "Amount",
    width: 100,
    default: 0,
  },
  action: {
    title: "Action",
    width: 20,
    render: (text, record) =>
    (
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => this.handleDelete(record.key)}
      >
        <CloseCircleOutlined style={{ fontSize: '20px' }} />
      </Popconfirm>
    )
  },
}

export default COLUMNS;