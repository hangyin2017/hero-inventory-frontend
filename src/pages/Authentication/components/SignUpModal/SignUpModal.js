import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import validator from "validator";
import signUp from '../../../../apis/signUp';
import PropTypes from "prop-types";
import Modal from "../Modal";
import FormItem from "../FormItem";
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
      validator: (value, data) => value === data.password.value,
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

const getInitialData = () => {
  return FORM.reduce((data, f) => ({
    ...data,
    [f.key]: {
      value: '',
      dirty: false,
    }
  }), {});
}

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: getInitialData(),
      errorMessage: null,
    };
    this.setData = this.setData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setErrorMessage(message){
    this.setState({
      errorMessage:message,
    });
  }
  setData(key) {
    return (event) => {
      event.preventDefault();
      const { value } = event.target;

      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          [key]: {
            value,
            dirty: true,
          }, 
        },
      }));
    };
  }

  valid() {
    const formHasErrorMessage = FORM.find((f) => this.getErrorMessage(f));
    return !formHasErrorMessage;

  }
  handleSubmit(event) {
    console.log('submit');
    const { data } = this.state;
    event.preventDefault();
    if (!this.valid()){
      return;
    }
    signUp({
      email: data.email.value,
      password: data.password.value
    })
    .catch((error) => {
      const message = error.response && {
      409: 'This email address has already been taken, please choose another one'
    }[error.response.status];

    this.setErrorMessage(message || 'Something went wrong, please try again later')
  });
  }


  getErrorMessage(field){
    const { data } = this.state;
    const { key, validations} = field;
    const { value } = data[key];
    const invalidValidation = validations.find((v) => !v.validator(value, data));

    if(!invalidValidation){
      return null;
    }
    return invalidValidation.message;
  }
  render() {
    const { data,errorMessage } = this.state;

    return (
      <Modal>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body> 
          <Form onSubmit={this.handleSubmit}>
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
                  onChange={this.setData(f.key)}
                  id={f.key}
                  type={f.type}
                />
                {data[f.key].dirty && this.getErrorMessage(f)}
              </FormItem>
            ))}
            <FormItem>
              <button> Sign Up</button>
            </FormItem>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          Already a member?&nbsp;
          <SignInButton>
            <Link to="/auth/signin">Sign In Now</Link>
          </SignInButton>
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
