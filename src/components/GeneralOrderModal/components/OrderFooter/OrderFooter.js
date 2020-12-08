import React from 'react';
import { Button } from 'antd';
import Form from '../../../Form';

const OrderFooter = ({ onCancel, setStatus }) => {
  return (
    <Form.Footer>
      <Button htmlType="submit" onClick={() => setStatus('draft')}>
        Save as Draft
      </Button>
      <Button type="primary" htmlType="submit" onClick={() => setStatus('confirmed')}>
        Save and Confirm
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>
  )
}

export default OrderFooter;