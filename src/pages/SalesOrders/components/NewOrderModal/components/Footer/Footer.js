import React from 'react';
import { Button } from 'antd';
import Form from '../../../../../../components/Form';

<<<<<<< HEAD
const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const FormFooter = ({ onCancel, setStatus }) => {

  return (
    <Form.Footer>
      <StyledButton htmlType="submit" onClick={ () => setStatus('draft') }>
        Save as Draft
      </StyledButton>
      <StyledButton type="primary" htmlType="submit" onClick={ () => setStatus('confirmed') }>
        Save and Confirm
      </StyledButton>
      <StyledButton onClick={ onCancel }>
=======
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
>>>>>>> origin/develop
        Cancel
      </Button>
    </Form.Footer>
  )
}

export default FormFooter;