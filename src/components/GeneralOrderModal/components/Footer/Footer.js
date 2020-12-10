import React from 'react';
import { Button } from 'antd';
import Form from '../../../Form';

const Footer = ({ onCancel }) => {
  return (
    <Form.Footer>
      <Button htmlType="submit">
        Save as Draft
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>
  )
}

export default Footer;
