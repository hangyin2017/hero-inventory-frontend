import React from 'react';
import { Button } from 'antd';
import Form from '../../Form';

const SimpleFooter = ({
  loading,
  onCancel,
  onSubmit,
}) => {
  return (
    <Form.Footer wrapperCol={{ span: 24 }}>
      <Button type="primary" loading={loading} onClick={onSubmit}>
        Save
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>  
  )
}

export default SimpleFooter;