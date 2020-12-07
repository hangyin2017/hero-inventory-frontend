import React from 'react';
import { Input, DatePicker } from 'antd';
import moment from 'moment';

export default {
  customerName: {
    label: "Customer Name",
    name: "username",
    rules: [
      {
        required: true,
        message: 'Please input customer name',
      },
    ],
    children: <Input />,
  },
  salesorderNumber: {
    label: "Sales Order#",
    name: "salesOrder",
    rules: [
      {
        required: true,
        message: 'Please input sales order number',
      },
    ],
    children: <Input />,
  },
  referenceNumber: {
    label: "Reference#",
    name: "salesReference",
    children: <Input />,
  },
  date: {
    label: "Sales Order Date",
    name: "salesOrderDate",
    rules: [
      {
        required: true,
        message: 'Please pick a sales order date',
      },
    ],
    children: <DatePicker initialValue={moment()} format="DD/MM/YYYY" />
  },
};