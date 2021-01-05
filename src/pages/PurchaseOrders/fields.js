import React from 'react';
import { Checkbox } from 'antd';
import timeFormatter from '../../utils/timeFormatter';

export default {
  Id: {
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
    label: 'Order Date',
    inTable: true,
    inDetails: true,
    formatter: timeFormatter.date,
  },
  createdTime: {
    label: 'Created Time',
    inDetails: true,
    formatter: timeFormatter.dateTime,
  },
  totalQuantity: {
    label: 'Total Quantity',
    inTable: true,
    inDetails: true,
  },
  totalPrice: {
    label: 'Total Price ($)',
    inTable: true,
    inDetails: true,
  },
  applyGst: {
    title: 'Apply GST',
    label: ' ',
    colon: false,
    valuePropName: 'checked',
    component: (
      <Checkbox>Apply GST</Checkbox>
    ),
    inDetails: true,
    formatter: (value) => value ? 'Yes' : 'No',
  },
  shipmentPrice: {
    label: 'Shipment Price ($)',
    inTable: true,
    inDetails: true,
  },
  adjustmentPrice: {
    label: 'Adjustment Price ($)',
    inTable: true,
    inDetails: true,
  },
  supplier: {
    label: 'Supplier',
    inTable: true,
    inDetails: true,
  },
}