import React from 'react';
import { Row } from 'antd';
import Form from '../../../../../../components/Form';
import DropdownPicker from '../../../../../../components/DropdownPicker';
import manufacturers from '../../../../../../apis/manufacturers';
import brands from '../../../../../../apis/brands';

const CategoryInfo = ({ formRef, formItems }) => {
  return (
    <Form.Section>
      <Row>
        <Form.Col>
          {formItems.category}
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          <Form.Item
            label="Manufacturer"
            name="manufacturer"
          >
            <DropdownPicker
              name="manufacturer"
              placeholder="Select a manufacturer"
              api={manufacturers}
              formRef={formRef}
            />
          </Form.Item>
        </Form.Col>
        <Form.Col>
          <Form.Item
            label="Brand"
            name="brand"
          >
            <DropdownPicker
              name="brand"
              placeholder="Select a brand"
              api={brands}
              formRef={formRef}
            />
          </Form.Item>
        </Form.Col>
      </Row>
    </Form.Section>
  );
};

export default CategoryInfo;