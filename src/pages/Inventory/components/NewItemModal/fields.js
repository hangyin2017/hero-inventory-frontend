import React from 'react';
import { Input, Checkbox } from 'antd';

const { TextArea } = Input;

export default {
  sku: {
    label: 'SKU',
  },
  upc: {
    label: 'UPC',
  },
  name: {
    label: "Name",
    required: true,
  },
  description: {
    label: "Description",
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
    label: "Categary",
  },
  brand: {
    label: "Brand",
  },
  manufacturer: {
    label: "Manufacturer",
  },
  sellingPrice: {
    label: "Selling Price",
  },
  costPrice: {
    label: "Cost Price",
  },
  applyGst: {
    label: " ",
    colon: false,
    valuePropName: "checked",
    component: (
      <Checkbox>Apply GST</Checkbox>
    ),
  },
  weight: {
    label: "Weight",
  },
  unit: {
    label: "Unit",
  },
  createdTime: {
    label: "Created Time",
  },
  physicalStock: {
    label: "Opening Stock",
  },
  lockedStock: {
    label: "Locked Stock",
  },
  arrivingQuantity: {
    label: "Arriving Quantity",
  },
};