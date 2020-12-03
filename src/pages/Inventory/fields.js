import React from 'react';
import { Input, Checkbox } from 'antd';

const { TextArea } = Input;

export default {
  sku: {
    label: 'SKU',
    inTable: true,
  },
  upc: {
    label: 'UPC',
    inTable: true,
  },
  name: {
    label: 'Name',
    required: true,
    inTable: true,
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
  },
  category: {
    label: 'Categary',
    inTable: true,
  },
  brand: {
    label: 'Brand',
    inTable: true,
  },
  manufacturer: {
    label: 'Manufacturer',
    inTable: true,
  },
  sellingPrice: {
    label: 'Selling Price',
    inTable: true,
  },
  costPrice: {
    label: 'Cost Price',
    inTable: true,
  },
  applyGst: {
    title: 'Apply GST',
    label: ' ',
    colon: false,
    valuePropName: 'checked',
    component: (
      <Checkbox>Apply GST</Checkbox>
    ),
  },
  weight: {
    label: 'Weight',
  },
  unit: {
    label: 'Unit',
  },
  createdTime: {
    label: 'Created Time',
    inTable: true,
  },
  physicalStock: {
    label: 'Opening Stock',
    inTable: true,
  },
  lockedStock: {
    label: 'Locked Stock',
  },
  arrivingQuantity: {
    label: 'Arriving Quantity',
  },
};