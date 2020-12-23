import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Spin, Result } from 'antd';
import styled from 'styled-components';
import validator from 'validator';
import auth from '../../../../apis/auth';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import ROUTES from '../../Routes';

const FIELDS = [{
  key: 'username',
  label: 'Username',
  type: 'text',
  validations: [{
    message: 'Please enter your username',
    validator: (value) => !validator.isEmpty(value),
  }],
},{
  key: 'email',
  label: 'Email',
  type: 'text',
  validations: [{
    message: 'Please enter your email address',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Please enter a valid email address',
    validator: (value) => validator.isEmail(value),
  }],
},{
  key: 'password',
  label: 'Password',
  type: 'password',
  validations: [{
    message: 'Please enter your password',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Password must be at least 8 characters',
    validator: (value) => validator.isLength(value, { min:8 }),
  }],
},{
  key: 'confirmPassword',
  label: 'Confirm Password',
  type: 'password',
  validations: [{
    message: 'Please confirm your password',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Confirmed password does not match the password',
    validator: (value, data) => value === data.password.value,
  }],
}];

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      signedUp: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  setSignedUp(value){
    this.setState({ signedUp: value });
  }

  onSubmit() {
    const { data, fetch } = this.props;

    fetch(() => auth.signUp({
      username: data.username.value,
      email: data.email.value,
      password: data.password.value
    }))
    .then(this.setSignedUp(true))
    .catch((error) => {});
  }

  render() {
    const { signedUp } = this.state;

    const {
      data,
      formDirty,
      valid,
      getErrorMessage,
      setData,
      submit,
      loading,
      error,
    } = this.props;

    const { AuthButton, AuthInput } = Modal;

    const SignedUp = (<Result
      status="success"
      title="Successfully signed up"
      subTitle="Thank you for signing up. A verification email has been sent"
    />);

    return (
      <Modal>
        <Modal.Header>Sign Up</Modal.Header>
        {signedUp ? (
          <Modal.Body>
            <Result
              status="success"
              title="Successfully signed up"
              subTitle="Thank you for signing up. A verification email has been sent"
            />
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <Spin spinning={loading}>
                <form onSubmit={submit(this.onSubmit)}>
                {error && (
                  <FormItem>
                    <ErrorMessage>{error}</ErrorMessage>
                  </FormItem>
                )} 
                  {FIELDS.map((f) => (
                    <FormItem key={f.key} htmlFor={f.key} label={f.label}>
                      <AuthInput
                        onChange={setData(f.key)}
                        id={f.key}
                        type={f.type}
                      />
                      {(formDirty || data[f.key].dirty) && getErrorMessage(f)}
                    </FormItem>
                  ))}
                  <AuthButton> Sign Up</AuthButton>
                </form>
              </Spin>
            </Modal.Body>
            <Modal.Footer>
              Already a member?&nbsp;
              <Link to={ROUTES.signIn.path}>Sign In Now</Link>
            </Modal.Footer>
          </>
        )}
      </Modal>
    ); 
  }
}

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

const SignUpModalWithForm = withForm(FIELDS)(SignUpModal);
const SignUpModalWithFetch = withFetch(SignUpModalWithForm);

export default SignUpModalWithFetch;
