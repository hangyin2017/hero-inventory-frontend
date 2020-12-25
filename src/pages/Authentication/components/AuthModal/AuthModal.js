import React from 'react';
import { Spin, Input, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from './assets/logo.png';

const HORIZON_GAP = '0';
const FONT_L = '24px';
const FONT_M = '16px';
const FONT_S = '14px';
const INPUT_HEIGHT = '44px';
const BORDER_RADIUS = '4px';
const DIVIDER_BORDER = '1px solid #dadada';

const Box = styled.div`
  position: relative;
  width: 500px;
  min-height: 520px;
  margin: 0 auto;
  padding: 50px;
  background-color: #FFF;
  transition: all .1s ease-in-out;
`;

const Logo = styled.div`
  height: 30px;
  margin-bottom: 20px;
  background: url(${logo}) no-repeat transparent;
  background-size: auto 100%;
`;

const Header = styled.div`
  padding: 0 ${HORIZON_GAP};
  font-size: ${FONT_L};
  font-weight: 500;
`;

const Body = styled.div`
  padding: 30px ${HORIZON_GAP};
`;

const StyledSpin = styled(Spin).attrs({
  size: 'large',
})`
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
`;

const AuthInput = styled(Input)`
  height: ${INPUT_HEIGHT};
  font-size: ${FONT_M};
  padding: 12px;
  border-radius: ${BORDER_RADIUS};
`;

const AuthButton = styled(Button).attrs({
  type: 'primary',
  block: true,
})`
  height: ${INPUT_HEIGHT};
  margin-top: 41px;
  border-radius: ${BORDER_RADIUS};
  font-size: ${FONT_M};
  font-weight: 500;
`;

const Footer = styled.div`
  padding: 20px ${HORIZON_GAP};
  border-top: ${DIVIDER_BORDER};
  text-align: center;
`;

const AuthModal = ({ title, children }) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Logo />
      <Header>{title}</Header>
      {children}
    </Box>
  )
}

AuthModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

AuthModal.Header = Header;
AuthModal.Body = Body;
AuthModal.StyledSpin = StyledSpin;
AuthModal.AuthInput = AuthInput;
AuthModal.AuthButton = AuthButton;
AuthModal.Footer = Footer;

export default AuthModal;