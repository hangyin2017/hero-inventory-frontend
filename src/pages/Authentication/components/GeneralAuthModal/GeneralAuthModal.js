import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthModal from '../AuthModal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import Shield from './components/Shield';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';

const Box = styled.div`
    width: 890px;
    display: flex;
    background-color: #fff;
    box-shadow: 0px 2px 30px #ccc6;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    overflow: hidden;
`;

const Main = styled.main`
  flex: 0 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
  padding: 40px;
  border-left: 2px solid #f1f1f1;
  text-align: center;
`;

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
        <Body>
          <StyledSpin spinning={loading}>
            <form>
              {error && (
                <FormItem>
                  <ErrorMessage>{error}</ErrorMessage>
                </FormItem>
              )} 
              {FIELDS.map((f) => (
                <FormItem key={f.key} htmlFor={f.key}>
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
        {footerNode ? (
          <Footer>{footerNode}</Footer>
        ) : null}
      </>
    );

    const MainAuthModal = (
      <AuthModal title={title}>
        {result ? AfterSubmission : BeforeSubmission}
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
          {MainAuthModal}
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

const GeneralAuthModalWithForm = withForm()(GeneralAuthModal);
const GeneralAuthModalWithFetch = withFetch()(GeneralAuthModalWithForm);

export default GeneralAuthModalWithFetch;