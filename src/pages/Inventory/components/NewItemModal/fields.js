import React from 'react';
import { Input, Select, Checkbox } from 'antd';

const { Option } = Select;

export default [
  [
    {
      label: 'Name',
      name: 'name',
      rules: [
        {
          required: true,
        },
      ],
      children: <Input />,
    },{
      label: 'SKU',
      name: 'sku',
      children: <Input />,
    },{
      label: 'Description',
      name: 'description',
      children: <Input />,
    },{
      label: 'UPC',
      name: 'upc',
      children: <Input />,
    }
  ],
  [
    {
      label: 'Category',
      name: 'category',
      children: (
        <Select
          placeholder="Select a category"
          allowClear
        >
          <Option value="male">Health Product</Option>
          <Option value="female">Gift</Option>
          <Option value="other">other</Option>
        </Select>
      ),
    },{
      label: 'Manufacturer',
      name: 'manufacturer',
      children: (
        <Select
          placeholder="Select a manufacturer"
          allowClear
        >
          <Option value="male">Sanofi</Option>
          <Option value="female">Lifespace</Option>
          <Option value="other">other</Option>
        </Select>
      ),
    },{
      label: 'Brand',
      name: 'brand',
      children: (
        <Select
          placeholder="Select a brand"
          allowClear
        >
          <Option value="male">A2</Option>
          <Option value="female">Sanofi</Option>
          <Option value="other">other</Option>
        </Select>
      ),
    }
  ],
  [
    {
      label: 'Selling Price',
      name: 'sellingPrice',
      children: <Input />,
    },{
      label: 'Cost Price',
      name: 'costPrice',
      children: <Input />,
    },{
      label: ' ',
      name: 'applyGst',
      children: (
        <Checkbox>
          Apply GST
        </Checkbox>
      ),
    }
  ],
  [
    {
      label: 'Opening Stock',
      name: 'openingStock',
      children: <Input />,
    }
  ],
];