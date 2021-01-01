import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../../../../apis/auth';
import Container from '../Container';
import GeneralAuthModal from '../GeneralAuthModal';
import ROUTES from '../../Routes';
import FIELDS from './Fields';
import { HOMEPAGE } from '../../../../Routes';
import { fontSizes } from '../../../../styles';

const { FONT_M } = fontSizes;
const ForgetPassword = styled.div`
  text-align: center;
  margin-top: 30px;

  & > a {
    font-size: ${FONT_M};
    font-weight: 500;
    color: #626262;
  }
`;

const SignInModal = () => {
  return (
    <Container showRight={true}>
      <GeneralAuthModal
        title="Sign In"
        FIELDS={FIELDS}
        api={auth.signIn}
        submitButtonText="Sign In"
        AfterSubmission={<Redirect to={HOMEPAGE.path} />}
        footerNode={(
          <>
            <span>Not a member yet?&nbsp;</span>
            <Link to={ROUTES.signUp.path}>Sign Up Now</Link>
          </>
        )}
      >
        <ForgetPassword>
          <Link to={ROUTES.forgetPassword.path}>Forgot Password?</Link>
        </ForgetPassword>
      </GeneralAuthModal>
    </Container>
  ); 
};

export default SignInModal;
