import React from "react";
import { Input, Select } from "antd";

const { TextArea } = Input;

export default {
  id: {
    label: "ID",
  },
  name: {
    label: "Supplier Name",
    inTable: true,
    inDetails: true,
    rules: [
      {
        required: true,
        message: 'Please enter a valid name',
        pattern: /^[a-zA-Z0-9_-]+$/,
      },
    ],
  },
  companyName: {
    label: "Company Name",
    inTable: true,
    inDetails: true,
  },
  website: {
    label: "Website",
    //inTable: true,
    inDetails: true,
    rules: [
      {
        message: 'Please enter a valid website',
        pattern: /((https?)?(:\/\/)?(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,
      },
    ],
  },
  active: {
    label: "Active",
    inDetails: true,
  },
  salutation: {
    label: "Salutation",
    inTable: true,
    inDetails: true,
    component: (
      <Select placeholder="Salutation" allowClear>
        <Option value="Mr.">Mr.</Option>
        <Option value="Mrs.">Mrs.</Option>
        <Option value="Ms.">Ms.</Option>
        <Option value="Miss.">Miss.</Option>
        <Option value="Dr.">Dr.</Option>
      </Select>
    ),
  },
  firstName: {
    label: "First Name",
    inTable: true,
    inDetails: true,
    rules: [
      {
        message: 'Please enter a valid name',
        pattern: /^[a-zA-Z]+$/,
      },
    ],
  },
  lastName: {
    label: "Last Name",
    inTable: true,
    inDetails: true,
    rules: [
      {
        message: 'Please enter a valid name',
        pattern: /^[a-zA-Z]+$/,
      },
    ],
  },
  email: {
    label: "Email",
    inDetails: true,
    inTable: true,
    rules: [
      {
        required: true,
        message: "Please enter a valid email!",
        pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      },
    ],
  },
  phone: {
    label: "Phone",
    inDetails: true,
    rules: [
      {
        message: "Please enter a valid phone number",
        pattern: /^[1-9]+[0-9]*$/,
      },
    ],
  },
  createdTime: {
    label: "Created Time",
    inDetails: true,
  },
  lastModifiedTime: {
    label: "Last Modified Time",
    inDetails: true,
  },
  comments: {
    label: "Comments",
    inDetails: true,
    component: (
      <TextArea
        showCount
        maxLength={255}
        allowClear
        utoSize={{ minRows: 3 }}
      />
    ),
  },
};
