import React from 'react';
import { Link } from 'react-router-dom';
import { Spin, Result } from 'antd';
import auth from '../../../../apis/auth';
import Modal from '../AuthModal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import ROUTES from '../../Routes';
import FIELDS from './Fields';

class ForgetPasswordModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      emailSent: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  setSignedUp(value){
    this.setState({ signedUp: value });
  }

  onSubmit() {
    const { data, fetch } = this.props;

    fetch(() => auth.forgetPassword(data.email.value))
    .then(this.setSignedUp(true))
    .catch((error) => {});
  }

  render() {
    const { emailSent } = this.state;

    const {
      data,
      formDirty,
      valid,
      getValidationMessage,
      setData,
      submit,
      loading,
      error,
    } = this.props;

    const { AuthButton, AuthInput } = Modal;

    const SentResult = (
      <Modal.Body>
        <Result
          status="success"
          title="Reset password link has been sent to your email"
          subTitle="Please check your email inbox and click on the verification link"
        />
      </Modal.Body>
    );

    const ForgetPasswordForm = (
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
                  {(formDirty || data[f.key].dirty) && getValidationMessage(f)}
                </FormItem>
              ))}
              <AuthButton onClick={submit(this.onSubmit)}>Send Verification Email</AuthButton>
            </form>
          </Spin>
        </Modal.Body>
        <Modal.Footer>
          Not a member yet?&nbsp;
          <Link to={ROUTES.signUp.path}>Sign Up Now</Link>
        </Modal.Footer>
      </>
    );

    return (
      <Modal>
        <Modal.Header>Forget Password</Modal.Header>
        {emailSent ? SentResult : ForgetPasswordForm}
      </Modal>
    ); 
  }
}

const ForgetPasswordModalWithForm = withForm(FIELDS)(ForgetPasswordModal);
const ForgetPasswordModalWithFetch = withFetch(ForgetPasswordModalWithForm);

export default ForgetPasswordModalWithFetch;
