import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Form from '../../Form';

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const FormFooter = ({ onCancel }) => {

  return (
    <Form.Footer>
      <StyledButton htmlType="submit">
        Save as Draft
      </StyledButton>
      <StyledButton type="primary" htmlType="submit" >
        Save and Confirm
      </StyledButton>
      <StyledButton onClick={onCancel}>
        Cancel
      </StyledButton>
    </Form.Footer>
  )
}

export default FormFooter;