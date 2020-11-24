import React from 'react';
import { Input, Row } from 'antd';
import Form from '../../../../../../components/Form';

const Stock = () => {
  return (
    <section>
      <Row>
        <Form.Col>
          <Form.Item
            label="Opening Stock"
            name="openingStock"
          >
            <Input />
          </Form.Item>
        </Form.Col>
      </Row>
    </section>
  );
};

export default Stock;