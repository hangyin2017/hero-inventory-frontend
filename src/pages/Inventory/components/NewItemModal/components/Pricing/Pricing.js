import React from 'react';
import { Row } from 'antd';
import Form from '../../../../../../components/Form';

const Pricing = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.sellingPrice}
        </Form.Col>
        <Form.Col>
          {formItems.costPrice}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.applyGst}
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default Pricing;