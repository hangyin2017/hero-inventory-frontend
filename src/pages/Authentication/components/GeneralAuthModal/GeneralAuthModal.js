import React from 'react';
import { Spin, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthModal from '../AuthModal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';

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
    const { api, token, data, fetch } = this.props;

    const values = Object.keys(data).reduce((obj, key) => ({
      ...obj,
      [key]: data[key].value,
    }), {});

    fetch(() => api(values, token))
    .then((res) => {
      this.setResult(res);
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
        <Body>
          <StyledSpin spinning={loading}>
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
                    placeholder={f.label}
                    onChange={setData(f.key)}
                  />
                  {(formDirty || data[f.key].dirty) && getValidationMessage(f)}
                </FormItem>
              ))}
              <AuthButton onClick={submit(this.handleSubmit)}>{submitButtonText}</AuthButton>
              {children}
            </form>
          </StyledSpin>
        </Body>
        <Footer>{footerNode}</Footer>
      </>
    );

    return (
      <AuthModal title={title}>
        {result ? AfterSubmission : BeforeSubmission}
      </AuthModal>
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

const GeneralAuthModalWithForm = withForm()(GeneralAuthModal);
const GeneralAuthModalWithFetch = withFetch()(GeneralAuthModalWithForm);

export default GeneralAuthModalWithFetch;