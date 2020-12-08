import React from "react";
import { Input, Row } from "antd";
import Form from "../../../../../../components/Form";

const CustomerInfo = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.customerName}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.salutation}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.firstName}
        </Form.Col>
        <Form.Col>
          {formItems.lastName}
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default CustomerInfo;
