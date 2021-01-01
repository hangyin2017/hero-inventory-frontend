import React from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import auth from '../../../../apis/auth';
import Container from '../Container';
import GeneralAuthModal from '../GeneralAuthModal';
import ROUTES from '../../Routes';
import FIELDS from './Fields';

const ForgetPasswordModal = () => {
  return (
    <Container showRight={true}>
      <GeneralAuthModal
        title="Forget Password"
        FIELDS={FIELDS}
        api={auth.forgetPassword}
        submitButtonText="Send Verification Email"
        AfterSubmission={<Result
          status="success"
          title="Reset Password Link Has Been Sent"
          subTitle="Please check your email inbox and click on the verification link"
        />}
        footerNode={(
          <>
            <span> Not a member yet?&nbsp;</span>
            <Link to={ROUTES.signUp.path}>Sign Up Now</Link>
          </>
        )}        
      />
    </Container>
  ); 
}

export default ForgetPasswordModal;
