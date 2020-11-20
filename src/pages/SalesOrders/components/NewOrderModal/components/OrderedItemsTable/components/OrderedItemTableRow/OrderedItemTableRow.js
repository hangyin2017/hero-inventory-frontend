import React from "react";
import { Form } from "antd";
import { EditableContext } from "../../OrderedItemsTable";
const OrderedItemTableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default OrderedItemTableRow;
