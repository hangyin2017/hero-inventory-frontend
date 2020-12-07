import React from 'react';
import { Input, DatePicker } from 'antd';
import moment from 'moment';

export default {
  supplierName: {
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
  purchaseorderNumber: {
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
  referenceNumber: {
    label: "Reference#",
    name: "purchaseReference",
    children: <Input />,
  },
  date: {
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
};