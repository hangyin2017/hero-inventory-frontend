import React from 'react';
import { Button } from 'antd';
import Form from '../../Form';

const SimpleFooter = ({ onCancel }) => {
  return (
    <Form.Footer wrapperCol={{ span: 24 }}>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>  
  )
}

export default SimpleFooter;