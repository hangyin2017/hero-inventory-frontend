import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Form from '../../../../../../components/Form';

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const FormFooter = ({ onCancel,setStatus }) => {

  return (
    <Form.Footer>
      <StyledButton htmlType="submit" onClick={ () => setStatus('draft') }>
        Save as Draft
      </StyledButton>
      <StyledButton type="primary" htmlType="submit" onClick={ () => setStatus('confirmed') }>
        Save and Confirm
      </StyledButton>
      <StyledButton onClick={ onCancel }>
        Cancel
      </StyledButton>
    </Form.Footer>
  )
}

export default FormFooter;