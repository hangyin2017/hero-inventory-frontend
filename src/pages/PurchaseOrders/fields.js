import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default {
  purchaseorderId: {
    label: 'Purchaseorder Id',
  },
  purchaseorderNumber: {
    label: 'Purchaseorder Number',
    inTable: true,
    inDetails: true,
    required: true,
  },
  referenceNumber: {
    label: 'Reference Number',
    inTable: true,
    inDetails: true,
  },
  date: {
    label: 'Date',
    inTable: true,
    inDetails: true,
  },
  description: {
    label: 'Description',
    component: (
      <TextArea
        showCount
        maxLength={255}
        allowClear
        autoSize={{ minRows: 3 }}
      />
    ),
    inDetails: true,
  },
  paidStatus: {
    label: 'Paid Status',
    inTable: true,
    inDetails: true,
  },
  invoicedStatus: {
    label: 'Invoiced Status',
    inTable: true,
    inDetails: true,
  },
  createdTime: {
    label: 'Created Time',
    inTable: true,
    inDetails: true,
  },
  supplier: {
    label: 'Supplier',
    inTable: true,
    inDetails: true,
  }
}