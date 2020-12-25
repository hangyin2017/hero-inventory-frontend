import React from 'react';
import { Result, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import AuthModal from '../AuthModal';
import RedirectCountdown from '../../../../components/RedirectCountdown';
import withFetch from '../../../../components/withFetch';
import authApi from '../../../../apis/auth';
import ROUTES from '../../Routes';

const REDIRECT_AFTER_SECONDS = 9;

class EmailVerificationModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null
    };
  }

  setResult(result) {
    this.setState({ result });
  }

  componentDidMount() {
    this.verifyEmail();
  }

  verifyEmail() {
    const { history, fetch } = this.props;
    const request = history.location.search;
    const token = request.replace('?token=', '');

    fetch(() => authApi.verifyEmail(token))
      .then((data) => {
        this.setResult("success");
      })
      .catch((err) => {
        this.setResult("fail");
      });
  }

  render() {
    const { result } = this.state;
    const { loading, error } = this.props;
    const { Body, StyledSpin } = AuthModal;

    return (
      <AuthModal title="Email Verification">
        <Body>
          <StyledSpin size="large" spinning={loading}>
            {{
              fail: (<Result
                status="error"
                title="Email Verification Failed"
                subTitle={error}
              />),
              success: (<Result
                status="success"
                title="Successfully verified email"
                subTitle={<RedirectCountdown seconds={REDIRECT_AFTER_SECONDS} to={ROUTES.signIn.path} />}
                extra={
                  <Button type="primary">
                    <Link to={ROUTES.signIn.path}>
                      Go To Sign In
                    </Link>
                  </Button>
                }
              />),
            }[result]}
          </StyledSpin>
        </Body>
      </AuthModal>
    ); 
  }
}

const EmailVerificationWithFetch = withFetch()(EmailVerificationModal);
const EmailVerificationWithRoute = withRouter(EmailVerificationWithFetch)

export default EmailVerificationWithRoute;
