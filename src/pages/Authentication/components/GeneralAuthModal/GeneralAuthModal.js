import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthModal from '../AuthModal';
import FormItem from '../FormItem';
import ErrorMessage from '../../../../components/ErrorMessage';
import Shield from './components/Shield';
import withForm from '../../../../components/withForm';
import withFetch from '../../../../components/withFetch';
import withAuthentication from '../../../../components/withAuthentication';
import compose from '../../../../utils/compose';
import { breakpoints } from '../../../../styles';

const Box = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: #fff;
  overflow: hidden;

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
    width: 500px;
    margin: 0 auto;
    box-shadow: 0px 2px 30px #ccc6;
  }

  @media (min-width: ${breakpoints.lg}) {
    width: 890px;
  }
`;

const Main = styled.main`
  flex: 0 0;
`;

const Right = styled.div`
  display: none;
  flex: 1 1;
  padding: 40px;
  border-left: 2px solid #f1f1f1;
  text-align: center;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

const EnhancedGeneralAuthModal = compose(
  withForm(),
  withFetch(),
  withAuthentication,
)(GeneralAuthModal);

export default EnhancedGeneralAuthModal;