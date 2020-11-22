import React from 'react';
import { Input, Select, Form, Row } from 'antd';
import Section from '../Section';

const CategoryInfo = () => {
  const { Option } = Select;

  return (
    <section>
      <Row>
        <Section.Col>
          <Form.Item
              label="Category"
              name="category"  
            >
              <Select
                placeholder="Select a category"
                allowClear
              >
                <Option value="male">Health Product</Option>
                <Option value="female">Gift</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
        </Section.Col>
      </Row>
      <Row>
        <Section.Col>
          <Form.Item
            label="Manufacturer"
            name="manufacturer"  
          >
            <Select
              placeholder="Select a manufacturer"
              allowClear
            >
              <Option value="male">Sanofi</Option>
              <Option value="female">Lifespace</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
        </Section.Col>
        <Section.Col>
          <Form.Item
              label="Brand"
              name="brand"  
            >
              <Select
                placeholder="Select a brand"
                allowClear
              >
                <Option value="male">A2</Option>
                <Option value="female">Sanofi</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
        </Section.Col>
      </Row>
    </section>
  );
};

export default CategoryInfo;