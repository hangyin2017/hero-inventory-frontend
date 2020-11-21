import React from 'react';
// import styled from 'styled-component';
import { Form, Button } from 'antd';

const layout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

const FormFooter = ({ onCancel }) => {

  return (
    <Form.Item { ...layout }>
      <Button htmlType="submit" style={{ margin: '0 8px' }}>
        Save as Draft
      </Button>
      <Button type="primary" htmlType="submit"  style={{ margin: '0 8px' }}>
        Save and Confirm
      </Button>
      <Button onClick={onCancel} style={{ margin: '0 8px' }}>
        Cancel
      </Button>
    </Form.Item>  
  )
}

export default FormFooter;