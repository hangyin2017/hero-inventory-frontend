import React from "react";
import { Input, Select } from "antd";

const { TextArea } = Input;

export default {
  supplierId: {
    label: "ID",
  },
  supplierName: {
    label: "Supplier Name",
    required: true,
    inTable: true,
    inDetails: true,
  },
  companyName: {
    label: "Company Name",
    inTable: true,
    inDetails: true,
  },
  website: {
    label: "Website",
    inTable: true,
    inDetails: true,
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
  },
  lastName: {
    label: "Last Name",
    inTable: true,
    inDetails: true,
  },
  email: {
    label: "Email",
    inDetails: true,
  },
  phone: {
    label: "Phone",
    inDetails: true,
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
    component: <TextArea showCount maxLength={255} allowClear autoSize={{ minRows: 3 }} />,
  },
};
