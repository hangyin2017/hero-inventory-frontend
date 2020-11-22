import React from 'react';
import { Input, Row, Checkbox } from 'antd';
import Form from '../../../../../../components/Form';

const Pricing = () => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          <Form.Item
            label="Selling Price"
            name="sellingPrice"
          >
            <Input />
          </Form.Item>
        </Form.Col>
        <Form.Col>
          <Form.Item
            label="Cost Price"
            name="costPrice"  
          >
            <Input />
          </Form.Item>          
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>          
          <Form.Item
            label=" "
            name="applyGst" 
            colon={false} 
          >
            <Checkbox>Apply GST</Checkbox>
          </Form.Item>
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default Pricing;