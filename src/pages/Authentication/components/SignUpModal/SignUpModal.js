import React from "react";
import styled from "styled-components";
import validator from "validator";
import signUp from '../../../../apis/signUp';
import PropTypes from "prop-types";
import Modal from "../../../../components/Modal";
import FormItem from "../../../../components/FormItem";
import ErrorMessage from "../../../../components/ErrorMessage";

const Form = styled.form`
  padding: 16px 0;
`;

const FORM = [
  {
    key: "email",
    label: "Email",
    type: "text",
    validations: [{
      message: 'Please enter your email address',
      validator: (value) => !validator.isEmpty(value),
    },{
      message: 'Please enter a valid email address',
      validator: (value) => validator.isEmail(value),
    }],
  },
  
  {
    key: "password",
    label: "Password",
    type: "password",
    validations: [{
      message: 'Please enter your password',
      validator: (value) => !validator.isEmpty(value),
    },{
      message: 'Password must be at least 8 characters',
      validator: (value) => validator.isLength(value, { min:8 }),
    }]
  },
  {
    key: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    validations: [{
      message: 'Please confirm your password',
      validator: (value) => !validator.isEmpty(value),
    },{
      message: 'Confirmed password does not match the password',
      validator: (value, formData) => value === formData.password.value,
    }
  ]
 
  }];

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
      errorMessage: null,
    };
    this.handleFormDataChange = this.handleFormDataChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setErrorMessage(message){
    this.setState({
      errorMessage:message,
    });
  }
  handleFormDataChange(key) {
    return (event) => {
      const { value } = event.target;
      event.preventDefault();

      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [key]: value, 
        },
      }));
    };
  }

  valid() {
    const formHasErrorMessage = FORM.find((f) => this.getErrorMessage(f));
    return !formHasErrorMessage;

  }
  handleFormSubmit(event) {
    const { formData } = this.state;
    event.preventDefault();
    if (!this.valid()){
      return;
    }
    signUp({
      email: formData.email.value,
      password: formData.password.value
    })
    .then(() => onClose())
    .catch((error) => {
      const message = error.response && {
      409: 'This email address has already been taken, please choose another one'
    }[error.response.status];

    this.setErrorMessage(message || 'Something went wrong, please try again later')
  });
  }


  getErrorMessage(form){
    const { formData, errorMessage } = this.state;
    const { key, validations} = form;
    const value = formData[key];
    const invalidValidation = validations.find((v) => !v.validator(value, formData));

    if(!invalidValidation){
      return null;
    }
    return invalidValidation.message;
  }
  render() {
    const { onClose, onSignIn } = this.props;
    const { formData,errorMessage } = this.state;

    return (
      <Modal onClose={onClose}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body> 
          <Form onSubmit={this.handleFormSubmit}>
          {errorMessage && (
            <FormItem>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </FormItem>
          )} 
          <FormItem>
            {errorMessage}
          </FormItem> 
            {FORM.map((f) => (
              <FormItem key={f.key} htmlFor={f.key} label={f.label}>
                <Input
                  onChange={this.handleFormDataChange(f.key)}
                  id={f.key}
                  type={f.type}
                />
                {this.getErrorMessage(f)}
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
