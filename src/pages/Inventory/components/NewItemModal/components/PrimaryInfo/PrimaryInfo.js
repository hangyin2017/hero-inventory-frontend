import React from 'react';
import { Input, Row } from 'antd';
import Form from '../../../../../../components/Form';

const PrimaryInfo = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.name}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.sku}
          {formItems.upc}
        </Form.Col>
        <Form.Col>
          {formItems.description}
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default PrimaryInfo;