import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const Header = styled.div`
  padding: 16px 24px;
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid #dadada;
`;

const Body = styled.div`
  padding: 32px 24px;
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #dadada;
`;
const Modal = ({ onClose, children }) => (
  <StyledModal onClick={(event) => event.stopPropagation()}>
    {children}
  </StyledModal>
);

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
