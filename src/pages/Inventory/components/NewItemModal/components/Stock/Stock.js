import React from 'react';
import { Row } from 'antd';
import Form from '../../../../../../components/Form';

const Stock = ({ formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.physicalStock}
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default Stock;