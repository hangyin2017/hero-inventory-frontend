import React from 'react';
import { Input, Form, Row } from 'antd';
import Section from '../Section';

const Stock = () => {
  return (
    <section>
      <Row>
        <Section.Col>
          <Form.Item
            label="Opening Stock"
            name="openingStock"
          >
            <Input />
          </Form.Item>
        </Section.Col>
      </Row>
    </section>
  );
};

export default Stock;