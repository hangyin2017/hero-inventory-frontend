import React from 'react';
import { Result, Spin } from 'antd';
import styled from 'styled-components';
import Modal from '../Modal';
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
    const { fetch } = this.props;

    try {
      await fetch(() => authApi.verifyEmail("HKbV41QilSLxqcq2-_SFGFBqJ2Ae1OTixL5QB8Gb0y8z65K7gizESkQF3w"));
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

export default withFetch(EmailVerificationModal);
