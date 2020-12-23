import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Spin, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
// import ROUTES from '../../Routes';

const horizonPadding = '24px';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const Header = styled.div`
  padding: 16px ${horizonPadding};
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 1px solid #dadada;
`;

const Body = styled.div`
  padding: 30px ${horizonPadding};
`;

const AuthInput = styled(Input)`
  height: 44px;
  font-size: 16px;
  padding: 12px;
  border-radius: 4px;
`;

const AuthButton = styled(Button).attrs({
  type: 'primary',
  block: true,
})`
  height: 44px;
  margin-top: 41px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
`;

const Footer = styled.div`
  padding: 20px ${horizonPadding};
  border-top: 1px solid #dadada;
  text-align: center;
`;

let FIELDS;

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    
    FIELDS = this.props.FIELDS;

    this.state = {
      result: null,
      errorMessage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setResult(result) {
    this.setState({ result });
  }

  setErrorMessage(errorMessage){
    this.setState({ errorMessage });
  }

  handleSubmit() {
    const { api, data, fetch } = this.props;

    fetch(() => api({
      username: data.username.value,
      password: data.password.value
    }))
    .then((res) => {
      this.setResult(res);
    })
    .catch((error) => {});
  }

  render() {
    const { result, errorMessage } = this.state;

    const {
      title,
      FIELDS,
      submitButtonText,
      children,
      AfterSubmission,
      footerNode,
      data,
      formDirty,
      valid,
      getValidationMessage,
      setData,
      submit,
      loading,
      error,
    } = this.props;

    const BeforeSubmission = (
      <>
        <Body>
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
                    id={f.key}
                    type={f.type}
                    onChange={setData(f.key)}
                  />
                  {(formDirty || data[f.key].dirty) && getValidationMessage(f)}
                </FormItem>
              ))}
              <AuthButton onClick={submit(this.handleSubmit)}>{submitButtonText}</AuthButton>
              {children}
            </form>
          </Spin>
        </Body>
        <Footer>{footerNode}</Footer>
      </>
    );

    return (
      <Container>
        <Header>{title}</Header>
        {result ? AfterSubmission : BeforeSubmission}
      </Container>
    ); 
  }
}

AuthModal.Container = Container;
AuthModal.Header = Header;
AuthModal.Body = Body;
AuthModal.AuthInput = AuthInput;
AuthModal.AuthButton = AuthButton;
AuthModal.Footer = Footer;

const AuthModalWithForm = withForm(FIELDS)(AuthModal);
const AuthModalWithFetch = withFetch(AuthModalWithForm);

export default AuthModalWithFetch;