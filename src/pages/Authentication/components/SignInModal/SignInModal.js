import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';
import signIn from '../../../../apis/signIn';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';

const Form = styled.form`
  padding: 16px 0;
`;

const FORM = [
  {
    key: 'email',
    label: 'Email',
    type: 'text',
    validations: [{
      message: 'Please enter your email address',
      validator: (value) => !validator.isEmpty(value),
    }],
  },
  
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    validations: [{
      message: 'Please enter your password',
      validator: (value) => !validator.isEmpty(value),
    },
  ]
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

const SignUpButton = styled.button`
  outline: 0;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #008fb4;
`;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      errorMessage: null,
    };

    this.handleFormDataChange = this.handleFormDataChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
  setErrorMessage(message){
    this.setState({
      errorMessage:message,
    });
  }
  handleFormSubmit(event) {
    const { formData } = this.state;
    event.preventDefault();
    if (!this.valid()){
      return;
    }

    signIn({
      email: formData.email.value,
      password: formData.password.value
    })
    .then((data) => {
      onClose();
      onSignIn(data);
    })
    .catch((error) => {
      const message = error.response && {
        404: 'Email and password does not match, please try again',
      }[error.response.status];

      this.setErrorMessage(message || 'Something went wrong, please try again later ');
    });
  }

  getErrorMessage(form){
    const { formData } = this.state;
    const { key, validations} = form;
    const value = formData[key];
    const invalidValidation = validations.find((v) => !v.validator(value, formData));

    if(!invalidValidation){
      return null;
    }
    return invalidValidation.message;
  }
  render() {
    const { formData,errorMessage } = this.state;

    return (
      <Modal>
        <Modal.Header>Sign In</Modal.Header>
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
              <button> Sign In</button>
            </FormItem>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          Not a member yet?&nbsp;
          <SignUpButton>
            <Link to="/auth/signup">
              Sign Up Now
            </Link>
          </SignUpButton>
        </Modal.Footer>
      </Modal>
    ); 
  }
}

SignInModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

// export default SignUpModal;

export default SignInModal;
