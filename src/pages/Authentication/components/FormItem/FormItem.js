import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fontSizes } from '../../../../styles';

const Wrapper = styled.div`
  transition: all .4s ease-in-out;
`;

const { FONT_M } = fontSizes;
const Label = styled.label`
  display: block;
  font-size: ${FONT_M};
  color: #626262;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
  min-height: 30px;
  margin: 2px 0 6px;
  color: ${color.dangerous};
  opacity: ${({ active }) => active ? 1 : 0};
  transition: all .4s ease-in-out;
`;

const FormItem = ({
  label,
  htmlFor,
  errorMessage,
  children,
}) => (
  <Wrapper>
    {label && <Label htmlFor={htmlFor}>{label}</Label>}
    {children}
    <ErrorMessage active={!!errorMessage}>{errorMessage}</ErrorMessage>
  </Wrapper>
);

FormItem.defaultProps = {
  label: undefined,
  htmlFor: undefined,
};

FormItem.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default FormItem;
