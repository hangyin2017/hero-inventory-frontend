import React from 'react';
import { Result } from 'antd';
import { withRouter } from 'react-router-dom';
import AuthModal from '../AuthModal';
import RedirectCountdown from '../../../../components/RedirectCountdown';
import withFetch from '../../../../components/withFetch';
import authApi from '../../../../apis/auth';
import { HOMEPAGE } from '../../../../Routes';

const REDIRECT_AFTER_SECONDS = 9;

class EmailVerificationModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    this.verifyEmail();
  }

  async verifyEmail() {
    const { history, fetch } = this.props;
    const request = history.location.search;
    const token = request.replace('?token=', '');

    try {
      await fetch(() => authApi.verifyEmail(token));
      this.setState({ result: "success" });
    } catch(err) {
      this.setState({ result: "fail" });
    };
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
                subTitle={<RedirectCountdown seconds={REDIRECT_AFTER_SECONDS} to={HOMEPAGE.path} />}
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
