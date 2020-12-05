import React from 'react';
import { Input, Checkbox } from 'antd';

const { TextArea } = Input;

export default {
  id: {
    label: 'ID',
  },
  sku: {
    label: 'SKU',
    inTable: true,
    inDetails: true,
  },
  upc: {
    label: 'UPC',
    inTable: true,
    inDetails: true,
  },
  name: {
    label: 'Name',
    required: true,
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
  active: {
    label: 'Active',
    inDetails: true,
  },
  category: {
    label: 'Categary',
    inTable: true,
    inDetails: true,
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
  },
  costPrice: {
    label: 'Cost Price',
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
    inTable: true,
    inDetails: true,
  },
  lastModifiedTime: {
    label: 'Last Modified Time',
    inDetails: true,
  },
  physicalStock: {
    title: 'Physical Stock',
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