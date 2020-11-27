import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  & ~ & {
    margin-top: 16px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #292b32;
  margin-bottom: 8px;
`;
const FormItem = ({ label, htmlFor, children }) => (
  <Wrapper>
    {label && <Label htmlFor={htmlFor}>{label}</Label>}
    {children}
  </Wrapper>
);
FormItem.defaultProps = {
  label: undefined,
  htmlFor: undefined,
};

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default FormItem;
