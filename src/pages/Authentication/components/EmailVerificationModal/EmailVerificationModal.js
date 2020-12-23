import React from 'react';
import { Result, Spin } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Modal from '../AuthModal';
import withFetch from '../../../../components/withFetch';
import authApi from '../../../../apis/auth';

const StyledSpin = styled(Spin)`
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
`;

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

    return (
      <Modal>
        <Modal.Header>Email Verification</Modal.Header>
        <Modal.Body>
          <StyledSpin size="large" spinning={loading}>
            {{
              fail: (<Result
                status="error"
                title="Email verification failed"
                subTitle={error}
              />),
              success: (<Result
                status="success"
                title="Successfully verified email"
                subTitle="Welcome to Hero Inventory! Redirecting to homepage..."
              />),
            }[result]}
          </StyledSpin>
        </Modal.Body>
      </Modal>
    ); 
  }
}

const EmailVerificationWithFetch = withFetch(EmailVerificationModal);
const EmailVerificationWithRoute = withRouter(EmailVerificationWithFetch)

export default withFetch(EmailVerificationWithRoute);
