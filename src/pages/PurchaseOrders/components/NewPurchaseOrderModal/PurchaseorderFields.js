import React from 'react';
import { Input, DatePicker } from 'antd';
import moment from 'moment';

export default {
  supplierName: {
    label: "Supplier Name",
    rules: [
      {
        required: true,
      },
    ],
    children: <Input />,
  },
  purchaseorderNumber: {
    label: "Purchase Order#",
    rules: [
      {
        required: true,
      },
    ],
    children: <Input />,
  },
  referenceNumber: {
    label: "Reference#",
    children: <Input />,
  },
  date: {
    label: "Purchase Order Date",
    rules: [
      {
        required: true,
      },
    ],
    children: <DatePicker initialValue={moment()} format="DD/MM/YYYY" />
  },
};