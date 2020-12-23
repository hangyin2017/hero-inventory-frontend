import React from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import auth from '../../../../apis/auth';
import GeneralAuthModal from '../GeneralAuthModal';
import ROUTES from '../../Routes';
import FIELDS from './Fields';

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GeneralAuthModal
        title="Sign Up"
        FIELDS={FIELDS}
        api={auth.signUp}
        submitButtonText="Sign Up"
        AfterSubmission={
          <Result
            status="success"
            title="Successfully Signed Up"
            subTitle="Thank you for signing up. A verification email has been sent"
          />
        }
        footerNode={(
          <>
            <span>Already a member?&nbsp;</span>
            <Link to={ROUTES.signIn.path}>Sign In Now</Link>
          </>
        )}        
      />
    ); 
  }
}

export default SignUpModal;
