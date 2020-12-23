import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';
import auth from '../../../../apis/auth';
import GeneralAuthModal from '../GeneralAuthModal';
import RedirectCountdown from '../../../../components/RedirectCountdown';
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
    ); 
  }
}

const ResetPasswordModalWithRoute = withRouter(ResetPasswordModal)

export default ResetPasswordModalWithRoute;
