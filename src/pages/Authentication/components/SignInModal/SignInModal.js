import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import validator from 'validator';
import auth from '../../../../apis/auth';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';

const Form = styled.form`
  padding: 16px 0;
`;

const FIELDS = [{
  key: 'username',
  label: 'Username',
  type: 'text',
  validations: [{
    message: 'Please enter your username',
    validator: (value) => !validator.isEmpty(value),
  }],
},{
  key: 'password',
  label: 'Password',
  type: 'password',
  validations: [{
    message: 'Please enter your password',
    validator: (value) => !validator.isEmpty(value),
  }],
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
      user: null,
      errorMessage: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  setErrorMessage(errorMessage){
    this.setState({ errorMessage });
  }

  onSubmit() {
    const { data, fetch } = this.props;

    fetch(() => auth.signIn({
      username: data.username.value,
      password: data.password.value
    }))
    auth.signIn({
        username: data.username.value,
        password: data.password.value
      })
    .then((data) => {
      this.setUser(data);
    })
    .catch((error) => {
      const message = error && {
        401: 'Email and password does not match, please try again',
      }[error.response.status];

      this.setErrorMessage(message || 'Something went wrong, please try again later ');
    });
  }

  render() {
    const { user, errorMessage } = this.state;

    const {
      data,
      formDirty,
      valid,
      getErrorMessage,
      setData,
      submit,
      loading,
    } = this.props;

    if(!!user) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Modal>
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Body>
          <Spin spinning={loading}>
            <Form onSubmit={submit(this.onSubmit)}>
            {errorMessage && (
              <FormItem>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </FormItem>
            )} 
              {FIELDS.map((f) => (
                <FormItem key={f.key} htmlFor={f.key} label={f.label}>
                  <Input
                    onChange={setData(f.key)}
                    id={f.key}
                    type={f.type}
                  />
                  {(formDirty || data[f.key].dirty) && getErrorMessage(f)}
                </FormItem>
              ))}
              <FormItem>
                <button> Sign In</button>
              </FormItem>
            </Form>
          </Spin>
        </Modal.Body>
        <Modal.Footer>
          Not a member yet?&nbsp;
          <SignUpButton>
            <Link to="/auth/signup">Sign Up Now</Link>
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

const SignInModalWithForm = withForm(FIELDS)(SignInModal);
const SignInModalWithFetch = withFetch(SignInModalWithForm);

export default SignInModalWithFetch;
