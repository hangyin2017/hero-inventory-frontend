import React from 'react';
import { Select, Row } from 'antd';
import Form from '../../../../../../components/Form';
import DropdownPicker from '../../../../../../components/DropdownPicker';
import manufacturers from '../../../../../../apis/manufacturers';
import brands from '../../../../../../apis/brands';

const CategoryInfo = () => {
  const { Option } = Select;

  return (
    <section>
      <Row>
        <Form.Col>
          <Form.Item
              label="Category"
              name="category"
            >
              <Select
                placeholder="Select a category"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="male">Health Product</Option>
                <Option value="female">Gift</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          <Form.Item
            label="Manufacturer"
            name="manufacturer"  
          >
            <DropdownPicker
              placeholder="Select a manufacturer"
              api={manufacturers}
            />
          </Form.Item>
        </Form.Col>
        <Form.Col>
          <Form.Item
            label="Brand"
            name="brand"  
          >
            <DropdownPicker
              placeholder="Select a brand"
              api={brands}
            />
          </Form.Item>
        </Form.Col>
      </Row>
    </section>
  );
};

export default CategoryInfo;