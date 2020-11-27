import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../Modal";
import FormItem from "../FormItem";

const Form = styled.form`
  padding: 16px 0;
`;

const FORM = [
  {
    key: "email",
    label: "Email",
    type: "text",
    getErrorMessage: (value) => {
      if (!value) {
        return "Please enter your password";
      }
      if (!/^[\w-.]+@([\w-]+\.)+[\w.]{2,4}$/.test(value)) {
        return "Please enter valid email address";
      }
      return null;
    },
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    getErrorMessage: () => {},
  },
  {
    key: "confirmPassword",
    label: "Confirm password",
    type: "password",
    getErrorMessage: () => {},
  },
];

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

const SignInButton = styled.button`
  outline: 0;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #008fb4;
`;

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };

    this.handleFormDataChange = this.handleFormDataChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormDataChange(target) {
    return (event) => {
      const { value } = event.target;
      event.preventDefault();

      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [target]: value,
        },
      }));
    };
  }

  handleFormSubmit(event) {
    const { formData } = this.state;
    event.preventDefault();
    console.log(formData);
  }
  render() {
    const { onClose, onSignIn } = this.props;
    const { formData } = this.state;

    return (
      <Modal onClose={onClose}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleFormSubmit}>
            {FORM.map(({ key, label, type, getErrorMessage }) => (
              <FormItem key={key} htmlFor={key} label={label}>
                <Input
                  onChange={this.handleFormDataChange(key)}
                  id={key}
                  type={key}
                />
                {getErrorMessage(formData[key])}
              </FormItem>
            ))}
            <FormItem>
              <button> Sign Up</button>
            </FormItem>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          Already a member?&nbsp;
          <SignInButton onClick={onSignIn}>Sign In Now</SignInButton>
        </Modal.Footer>
      </Modal>
    );
  }
}

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default SignUpModal;
