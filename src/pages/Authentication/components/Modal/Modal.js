import React from "react";
import { Input, Button } from 'antd';
import PropTypes from "prop-types";
import styled from "styled-components";

const horizonPadding = '24px';

const StyledModal = styled.div`
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
Modal.AuthInput = AuthInput;
Modal.AuthButton = AuthButton;
Modal.Footer = Footer;

export default Modal;
