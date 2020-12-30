import React from 'react';
import { Button } from 'antd';
import Form from '../../../Form';

const Footer = ({
  loading,
  onCancel,
}) => {
  return (
    <Form.Footer>
      <Button type="primary" htmlType="submit" loading={loading}>
        Save
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>
  )
}

export default Footer;
