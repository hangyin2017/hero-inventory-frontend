import React from 'react';
import { Form, Button } from 'antd';

const layout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

const FormFooter = () => {
  return (
    <Form.Item { ...layout }>
      <Button style={{ margin: '0 8px' }}>
        Save as Draft
      </Button>
      <Button type="primary" htmlType="submit"  style={{ margin: '0 8px' }}>
        Save and Confirm
      </Button>
      <Button style={{ margin: '0 8px' }}>
        Cancel
      </Button>
    </Form.Item>  
  )
}

export default FormFooter;