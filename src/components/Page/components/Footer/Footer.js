import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const Footer = () => {
  return (
    <Wrapper>© 2020, Hero Inventory Group. All Rights Reserved.</Wrapper>
  );
};

export default Footer;