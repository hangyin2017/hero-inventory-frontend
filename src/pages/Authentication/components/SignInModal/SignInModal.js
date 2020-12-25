import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../../../../apis/auth';
import GeneralAuthModal from '../GeneralAuthModal';
import withAuthentication from '../../../../components/withAuthentication';
import ROUTES from '../../Routes';
import FIELDS from './Fields';
import { HOMEPAGE } from '../../../../Routes';

const ForgetPassword = styled.div`
  text-align: center;
  margin-top: 30px;

  & > a {
    font-size: 16px;
    font-weight: 500;
    color: #626262;
  }
`;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authentication } = this.props;
    const { user, setUser } = authentication;

    return (
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
        showRight={true}
      >
        <ForgetPassword>
          <Link to={ROUTES.forgetPassword.path}>Forgot Password?</Link>
        </ForgetPassword>
      </GeneralAuthModal>
    ); 
  }
}

export default withAuthentication(SignInModal);
