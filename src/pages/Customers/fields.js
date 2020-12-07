import React from "react";
import { Input, Checkbox, Select } from "antd";

const { TextArea } = Input;

export default {
  id: {
    label: "ID",
  },
  name: {
    label: "Customer Name",
    required: true,
  },
  companyName: {
    label: "Company Name",
  },
  website: {
    label: "Website",
  },
  active: {
    label: "Active",
  },
  salutation: {
    label: "Salutation",
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
  },
  lastName: {
    label: "Last Name",
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
