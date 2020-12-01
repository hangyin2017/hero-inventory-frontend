import React from 'react';
import { Button } from 'antd';
import Form from '../../Form';

const SimpleFooter = ({
  loading,
  onCancel,
}) => {
  return (
    <Form.Footer wrapperCol={{ span: 24 }}>
      <Button type="primary" htmlType="submit" loading={loading}>
        Save
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>  
  )
}

export default SimpleFooter;