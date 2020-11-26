import React from 'react';
import { Select, Row } from 'antd';
import Form from '../../../../../../components/Form';
import DropdownPicker from '../../../../../../components/DropdownPicker';
import brands from '../../../../../../apis/brands';

const CategoryInfo = ({ data }) => {
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
              dataSource={brands.getAll}
            />
            {/* <Select
              placeholder="Select a category"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            > */}
              {/* <Option value="male">Sanofi</Option>
              <Option value="female">Lifespace</Option>
              <Option value="other">other</Option> */}
            {/* </Select> */}
          </Form.Item>
        </Form.Col>
        <Form.Col>
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
        </Form.Col>
      </Row>
    </section>
  );
};

export default CategoryInfo;