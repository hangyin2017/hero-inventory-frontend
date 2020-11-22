import React from 'react';
import { Input, Form, Row } from 'antd';
import Section from '../Section';

const PrimaryInfo = () => {
  const { TextArea } = Input;

  return (
    <section>
      <Row>
        <Section.Col>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Section.Col>
      </Row>
      <Row>
        <Section.Col>
          <Form.Item
            label="SKU"
            name="sku"  
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="UPC"
            name="upc"  
          >
            <Input />
          </Form.Item>
        </Section.Col>
        <Section.Col>
          <Form.Item
              label="Description"
              name="description"  
            >
              <TextArea
                showCount
                maxLength={100}
                allowClear
                autoSize={{ minRows: 3 }}  
              />
            </Form.Item>
        </Section.Col>
      </Row>
    </section>
  );
};

export default PrimaryInfo;