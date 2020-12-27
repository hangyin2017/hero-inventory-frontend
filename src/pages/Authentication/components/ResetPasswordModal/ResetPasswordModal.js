import React from 'react';
import { Result, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import auth from '../../../../apis/auth';
import Container from '../Container';
import GeneralAuthModal from '../GeneralAuthModal';
import RedirectCountdown from '../../../../components/RedirectCountdown';
import compose from '../../../../utils/compose';
import FIELDS from './Fields';
import ROUTES from '../../Routes';

const REDIRECT_AFTER_SECONDS = 9;

class ResetPasswordModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    const request = history.location.search;
    const token = request.replace('?token=', '');

    return (
      <Container>
        <GeneralAuthModal
          title="Reset Password"
          FIELDS={FIELDS}
          api={auth.resetPassword}
          token={token}
          submitButtonText="Reset Password"
          AfterSubmission={
            <Result
              status="success"
              title="Successfully Reset Password"
              subTitle={<RedirectCountdown seconds={REDIRECT_AFTER_SECONDS} to={ROUTES.signIn.path} />}
              extra={
                <Button type="primary">
                  <Link to={ROUTES.signIn.path}>
                    Go To Sign In
                  </Link>
                </Button>
              }
            />
          }
        />
      </Container>
    ); 
  }
}

const EnhancedResetPasswordModal = compose(
  withRouter,
)(ResetPasswordModal);

export default EnhancedResetPasswordModal;
