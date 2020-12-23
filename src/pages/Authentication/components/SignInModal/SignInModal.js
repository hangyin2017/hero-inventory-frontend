import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import auth from '../../../../apis/auth';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import PAGES from '../../../../pages';
import ROUTES from '../../Routes';
import FIELDS from './Fields';

const ForgetPassword = styled.div`
  text-align: center;
  margin-top: 30px;

  & > a {
    font-size: 16px;
    font-weight: 500;
    color: #626262;
  }
`;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
      errorMessage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  setErrorMessage(errorMessage){
    this.setState({ errorMessage });
  }

  handleSubmit() {
    const { data, fetch } = this.props;

    fetch(() => auth.signIn({
      username: data.username.value,
      password: data.password.value
    }))
    .then((data) => {
      this.setUser(data);
    })
    .catch((error) => {
      const message = error && {
        401: 'Email and password does not match, please try again',
      }[error.response?.status];

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

    const { AuthButton, AuthInput } = Modal;

    if(!!user) {
      return <Redirect to={PAGES.dashboard.path} />
    }

    return (
      <Modal>
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Body>
          <Spin spinning={loading}>
            <form>
            {errorMessage && (
              <FormItem>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </FormItem>
            )} 
              {FIELDS.map((f) => (
                <FormItem key={f.key} htmlFor={f.key} label={f.label}>
                  <AuthInput
                    id={f.key}
                    type={f.type}
                    onChange={setData(f.key)}
                  />
                  {(formDirty || data[f.key].dirty) && getErrorMessage(f)}
                </FormItem>
              ))}
              <AuthButton onClick={submit(this.handleSubmit)}>Sign In</AuthButton>
              <ForgetPassword>
                <Link to={ROUTES.forgetPassword.path}>Forgot Password?</Link>
              </ForgetPassword>
            </form>
          </Spin>
        </Modal.Body>
        <Modal.Footer>
          Not a member yet?&nbsp;
          <Link to={ROUTES.signUp.path}>Sign Up Now</Link>
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
