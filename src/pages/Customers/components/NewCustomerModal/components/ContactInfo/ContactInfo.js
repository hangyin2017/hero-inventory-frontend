import React from "react";
import { Row } from "antd";
import Form from "../../../../../../components/Form";

const ContactInfo = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.companyName}
        </Form.Col>
        <Form.Col>
          {formItems.website}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.email}
          {formItems.phone}
        </Form.Col>
        <Form.Col>
          {formItems.comments}
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default ContactInfo;
