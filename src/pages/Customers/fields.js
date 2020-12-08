import React from "react";
import { Input, Select } from "antd";

const { TextArea } = Input;

export default {
  id: {
    label: "ID",
  },
  customerName: {
    label: "Customer Name",
    required: true,
    inTable: true,
  },
  companyName: {
    label: "Company Name",
    inTable: true,
  },
  website: {
    label: "Website",
    inTable: true,
  },
  active: {
    label: "Active",
    inTable: true,
  },
  salutation: {
    label: "Salutation",
    inTable: true,
    component:(
      <Select 
        placeholder="Salutation"
        allowClear
        >
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
  },
  lastName: {
    label: "Last Name",
    inTable: true,
  },
  email: {
    label: "Email",
  },
  phone: {
    label: "Phone",
  },
  createdTime: {
    label: "Created Time",
  },
  lastModifiedTime: {
    label: "Last Modified Time",
  },
  comments: {
	label: "Comments",
  component: (
    <TextArea
      showCount
      maxLength={255}
      allowClear
      autoSize={{ minRows: 3 }}  
    />
  ),
  },
};
