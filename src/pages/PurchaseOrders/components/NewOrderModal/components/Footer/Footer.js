import React from 'react';
import { Button } from 'antd';
import Form from '../../../../../../components/Form';

const FormFooter = ({ onCancel }) => {

  return (
    <Form.Footer>
      <Button htmlType="submit">
        Save as Draft
      </Button>
      <Button type="primary" htmlType="submit" >
        Save and Confirm
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
    </Form.Footer>
  )
}

export default FormFooter;