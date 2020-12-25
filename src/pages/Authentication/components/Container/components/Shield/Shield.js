import React from "react";
import styled from "styled-components";
import shield from './assets/shield.png';
import { fontSizes } from '../../../../../../styles';

const { FONT_M } = fontSizes;

const Wrapper = styled.div`
`;

const ShieldImg = styled.div`
  margin: 0 auto 50px;

  & > img {
    height: 180px;
    width: 180px;
  }
`;

const ShieldTitle = styled.div`
  font-size: ${FONT_M};
  font-weight: 600;
  margin-bottom: 10px;
`;

const ShieldText = styled.div`
  line-height: 24px;
`;

const Shield = () => {
  return (
    <Wrapper>
      <ShieldImg><img src={shield} /></ShieldImg>
      <ShieldTitle>KEEP YOUR ACCOUNT SECURE</ShieldTitle>
      <ShieldText>
        OneAuth is our new in-house multi-factor authentication app.
        Shield your account with OneAuth now.
      </ShieldText>
    </Wrapper>
  )
}

export default Shield;