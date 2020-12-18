import React from "react";
import { Result } from 'antd';
import styled from "styled-components";
import Modal from "../Modal";

class EmailVerificationModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    return (
      <Modal>
        <Modal.Header>Email Verification</Modal.Header>
        <Modal.Body>
          <Result
            status="success"
            title="Successfully verified email"
            subTitle="Welcome to Hero Inventory! Redirecting to homepage..."
          />        
        </Modal.Body>
      </Modal>
    ); 
  }
}

export default EmailVerificationModal;
