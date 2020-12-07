import React from "react";
import { Row } from "antd";
import Form from "../../../../../../components/Form";

const ContactInfo = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>{formItems.active}</Form.Col>
      </Row>
    </Form.Section>
  );
};

export default ContactInfo;
