import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'antd';

const layout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const FormFooter = ({ onCancel }) => {

  return (
    <Form.Item { ...layout }>
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