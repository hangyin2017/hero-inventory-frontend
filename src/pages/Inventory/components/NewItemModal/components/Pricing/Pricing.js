import React from 'react';
import { Input, Form, Row, Checkbox } from 'antd';
import Section from '../Section';

const Pricing = () => {
  return (
    <section>
      <Row>
        <Section.Col>
          <Form.Item
            label="Selling Price"
            name="sellingPrice"
          >
            <Input />
          </Form.Item>
        </Section.Col>
        <Section.Col>
          <Form.Item
            label="Cost Price"
            name="costPrice"  
          >
            <Input />
          </Form.Item>          
        </Section.Col>
      </Row>
      <Row>
        <Section.Col>          
          <Form.Item
            label=" "
            name="applyGst" 
            colon={false} 
          >
            <Checkbox>Apply GST</Checkbox>
          </Form.Item>
        </Section.Col>
      </Row>
    </section>
  );
};

export default Pricing;