import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'antd';

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const FormFooter = ({ onCancel }) => {

  return (
      <Form.Item wrapperCol={{ span: 24 }}>
        <StyledButton type="primary" htmlType="submit">
          Save
        </StyledButton>
        <StyledButton onClick={onCancel}>
          Cancel
        </StyledButton>
      </Form.Item>  
  )
}

export default FormFooter;