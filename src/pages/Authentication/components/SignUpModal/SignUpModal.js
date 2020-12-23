import React from 'react';
import { Link } from 'react-router-dom';
import { Spin, Result } from 'antd';
import PropTypes from 'prop-types';
import auth from '../../../../apis/auth';
import Modal from '../Modal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import ROUTES from '../../Routes';
import FIELDS from './Fields';

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

    const SignUpResult = (
      <Modal.Body>
        <Result
          status="success"
          title="Successfully signed up"
          subTitle="Thank you for signing up. A verification email has been sent"
        />
      </Modal.Body>
    );

    const SignUpForm = (
      <>
        <Modal.Body>
          <Spin spinning={loading}>
            <form>
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
              <AuthButton onClick={submit(this.onSubmit)}>Sign Up</AuthButton>
            </form>
          </Spin>
        </Modal.Body>
        <Modal.Footer>
          Already a member?&nbsp;
          <Link to={ROUTES.signIn.path}>Sign In Now</Link>
        </Modal.Footer>
      </>
    );

    return (
      <Modal>
        <Modal.Header>Sign Up</Modal.Header>
        {signedUp ? SignUpResult : SignUpForm}
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
