import React from 'react';
import { Input, Row } from 'antd';
import Form from '../../../../../../components/Form';

const PrimaryInfo = ({ formItems }) => {
  const { TextArea } = Input;

  return (
    <section>
      <Row>
        <Form.Col>
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
        </Form.Col>
      </Row>
      <Row>
        <Form.Col>
          {formItems.sku}
          {/* <Form.Item
            label="SKU"
            name="sku"  
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="UPC"
            name="upc"  
          >
            <Input />
          </Form.Item>
        </Form.Col>
        <Form.Col>
          <Form.Item
              label="Description"
              name="description"  
          >
            <TextArea
              showCount
              maxLength={255}
              allowClear
              autoSize={{ minRows: 3 }}  
            />
          </Form.Item>
        </Form.Col>
      </Row>
    </section>
  );
};

export default PrimaryInfo;