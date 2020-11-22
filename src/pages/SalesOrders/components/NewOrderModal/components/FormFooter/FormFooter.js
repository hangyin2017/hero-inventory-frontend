import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'antd';

const layout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eee;
  box-shadow: 0 -4px 5px -3px rgba(0,0,0,.1);
  background-color: #fff;
  padding: 15px;
`;

const FormFooter = ({ onCancel }) => {

  return (
    <Footer>
    {/* <Form.Item { ...layout }> */}
      <Button htmlType="submit" style={{ margin: '0 8px' }}>
        Save as Draft
      </Button>
      <Button type="primary" htmlType="submit"  style={{ margin: '0 8px' }}>
        Save and Confirm
      </Button>
      <Button onClick={onCancel} style={{ margin: '0 8px' }}>
        Cancel
      </Button>
    {/* </Form.Item>   */}
    </Footer>
  )
}

export default FormFooter;