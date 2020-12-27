import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthModal from '../AuthModal';
import FormItem from '../FormItem';
import Alert from '../../../../components/Alert';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import withAuthentication from '../../../../components/withAuthentication';
import compose from '../../../../utils/compose';

class GeneralAuthModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setResult(result) {
    this.setState({ result });
  }

  handleSubmit() {
    const { api, token, data, fetch, authentication } = this.props;

    const values = Object.keys(data).reduce((obj, key) => ({
      ...obj,
      [key]: data[key].value,
    }), {});

    fetch(() => api(values, token))
      .then((data) => {
        if(!!data?.username) {
          authentication.setUser(data);
        }
        this.setResult(data);
      })
      .catch((error) => {});
  }

  render() {
    const { result } = this.state;

    const {
      title,
      FIELDS,
      submitButtonText,
      children,
      AfterSubmission,
      footerNode,
      showRight,
      data,
      formDirty,
      valid,
      getValidationMessage,
      setData,
      submit,
      loading,
      error,
    } = this.props;

    const { Body, StyledSpin, AuthInput, AuthButton, Footer } = AuthModal;

    const BeforeSubmission = (
      <>
        <StyledSpin spinning={loading}>
          <Body>
            <form>
              {error && (
                <FormItem>
                  <Alert>{error}</Alert>
                </FormItem>
              )} 
              {FIELDS.map((f) => {
                const { key, type, label } = f;
                const { errorMessage } = data[key];

                return (
                  <FormItem key={key} htmlFor={key} errorMessage={errorMessage}>
                    <AuthInput
                      id={key}
                      type={type}
                      placeholder={label}
                      invalid={!!errorMessage}
                      onChange={setData(key)}
                    />
                  </FormItem>
                );
              })}
              <AuthButton
                onClick={submit(this.handleSubmit)}
                disabled={!valid}
              >
                {submitButtonText}
              </AuthButton>
              {children}
            </form>
          </Body>
        </StyledSpin>
        {footerNode ? (
          <Footer>{footerNode}</Footer>
        ) : null}
      </>
    );

    const MainAuthModal = (
      <AuthModal title={title}>
        {!!result ? AfterSubmission : BeforeSubmission}
      </AuthModal>
    );

    return (
      <>
        {showRight ? (
          <Box>
            <Main>
              {MainAuthModal}
            </Main>
            <Right>
              <Shield />
            </Right>
          </Box>
        ) : (
          <>
            {MainAuthModal}
          </>
        )}
      </>
    );
  }
}

GeneralAuthModal.propTypes = {
  title: PropTypes.string.isRequired,
  FIELDS: PropTypes.array.isRequired,
  submitButtonText: PropTypes.string,
  children: PropTypes.node,
  AfterSubmission: PropTypes.node,
  footerNode: PropTypes.node,
};

const EnhancedGeneralAuthModal = compose(
  withForm(),
  withFetch(),
  withAuthentication,
)(GeneralAuthModal);

export default EnhancedGeneralAuthModal;