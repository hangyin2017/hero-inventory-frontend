import React from 'react';
import { Input, DatePicker } from 'antd';
import moment from 'moment';

export default [
  {
    label: "Supplier Name",
    name: "username",
    rules: [
      {
        required: true,
        message: 'Please input supplier name',
      },
    ],
    children: <Input />,
  },
  {
    label: "Purchase Order#",
    name: "purchaseOrder",
    rules: [
      {
        required: true,
        message: 'Please input purchase order number',
      },
    ],
    children: <Input />,
  },
  {
    label: "Reference#",
    name: "purchaseReference",
    children: <Input />,
  },
  {
    label: "Purchase Order Date",
    name: "purchaseOrderDate",
    rules: [
      {
        required: true,
        message: 'Please pick a purchase order date',
      },
    ],
    children: <DatePicker initialValue={moment()} format="DD/MM/YYYY" />
  },
];