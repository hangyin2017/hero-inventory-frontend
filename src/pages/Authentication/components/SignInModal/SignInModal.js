import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../Modal";
import FormItem from "../FormItem"

const Form = styled.form`
  padding: 16px 0;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  color: #292b32;
  font-size: 14px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #bbc2dc;
`;

const SignUpButton = styled.button`
  outline: 0;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #008fb4;
`;

const SignInModal = ({ onClose, onSignUp }) => (
  <Modal onClose={onClose}>
    <Modal.Header>Sign In</Modal.Header>
    <Modal.Body>
      <Form>
        <FormItem label="Email" htmlFor="email">
          <Input id="email" />
        </FormItem>
      
        <FormItem label="Password" htmlFor="password">
          <Input id="password" type="password" />
        </FormItem>

        <FormItem>
          <button>Sign In</button>
        </FormItem>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      Not a member yet?&nbsp;
      <SignUpButton onClick={onSignUp}>Sign Up Now</SignUpButton>
    </Modal.Footer>
  </Modal>
);

SignInModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default SignInModal;
