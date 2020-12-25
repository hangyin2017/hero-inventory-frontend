import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  & ~ & {
    margin-top: 30px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #626262;
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
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default FormItem;
