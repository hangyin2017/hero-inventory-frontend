import React from 'react';
import { Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const COLUMNS =  {
  itemName: {
    title: 'Item Details',
    width: 300,
    default: null,
  },
  quantity: {
    title: 'Quantity',
    width: 100,
    editable: true,
    default: 1,
  },
  rate: {
    title: 'Rate',
    width: 100,
    editable: true,
    default: 0.0,
  },
  amount: {
    title: 'Amount',
    width: 100,
    default: 0,
  },
  gst: {
    title: 'GST',
    width: 100,
    default: 0,
  },
  action: {
    title: 'Action',
    width: 20,
  },
}

export default COLUMNS;