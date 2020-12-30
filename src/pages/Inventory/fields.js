import React from 'react';
import { Input, Checkbox } from 'antd';
import timeFormatter from '../../utils/timeFormatter';

const { TextArea } = Input;

export default {
  id: {
    label: 'ID',
  },
  sku: {
    label: 'SKU',
    inTable: true,
    inDetails: true,
    rules: [
      {
        required: true,
        message: 'Please enter a SKU with numbers or letters',
        pattern: /^[A-Za-z0-9]+$/
      },
    ],
  },
  upc: {
    label: 'UPC',
    inTable: true,
    inDetails: true,
    rules: [
      {
        message: 'Please enter a UPC with numbers or letters',
        pattern: /^[A-Za-z0-9]+$/
      },
    ],
  },
  name: {
    label: 'Name',
    inTable: true,
    inDetails: true,
    rules: [
      {
        required: true,
        message: 'Please enter a valid name',
        pattern: /^\w+$/,
      },
    ],
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
  active: {
    label: 'Active',
    inDetails: true,
  },
  category: {
    label: 'Category',
    inTable: true,
    inDetails: true,
    rules: [
      {
        message: 'Please enter a valid category',
        pattern: /^[a-z0-9A-Z]+$/,
      }
    ]
  },
  brand: {
    label: 'Brand',
    inTable: true,
    inDetails: true,
  },
  manufacturer: {
    label: 'Manufacturer',
    inTable: true,
    inDetails: true,
  },
  sellingPrice: {
    label: 'Selling Price',
    inTable: true,
    inDetails: true,
    rules: [
      {
        required: true,
        message: 'Please enter a number',
        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
      },
    ],
  },
  costPrice: {
    label: 'Cost Price',
    inTable: true,
    inDetails: true,
    rules: [
      {
        required: true,
        message: 'Please enter a number',
        pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
      },
    ],
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
  length: {
    label: 'Length',
  },
  width: {
    label: 'Width',
  },
  height: {
    label: 'Height',
  },
  weight: {
    label: 'Weight',
    inDetails: true,
  },
  unit: {
    label: 'Unit',
    inDetails: true,
  },
  unitsPerCarton: {
    label: 'Units Per Carton',
    inDetails: true,
  },
  unitsPerPallet: {
    label: 'Units Per Pallet',
    inDetails: true,
  },
  createdTime: {
    label: 'Created Time',
    inDetails: true,
    formatter: timeFormatter('dateTime'),
  },
  lastModifiedTime: {
    label: 'Last Modified Time',
    inDetails: true,
    formatter: timeFormatter('dateTime'),
  },
  physicalStock: {
    title: 'Physical Stock',
    label: 'Opening Stock',
    inTable: true,
    rules: [
      {
        required: true,
        message: 'Please enter a number as opening stock',
        pattern: /^[0-9]+$/,
      },
    ],
  },
  lockedStock: {
    label: 'Locked Stock',
  },
  arrivingQuantity: {
    label: 'Arriving Quantity',
  },
};