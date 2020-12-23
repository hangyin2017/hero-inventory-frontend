import React from 'react';
import { Spin, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HORIZON_GAP = '24px';
const FONT_L = '24px';
const FONT_M = '16px';
const FONT_S = '14px';
const INPUT_HEIGHT = '44px';
const BORDER_RADIUS = '4px';
const DIVIDER_BORDER = '1px solid #dadada';

const Box = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const Header = styled.div`
  padding: 16px ${HORIZON_GAP};
  text-align: center;
  font-size: ${FONT_L};
  font-weight: 500;
  border-bottom: ${DIVIDER_BORDER};
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