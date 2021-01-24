import React from 'react';
import styled from 'styled-components';
import User from './components/User';
import logo from '../../../../assets/img/logo.png';
import { HOMEPAGE } from '../../../../routes.ts';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7;
  text-align: center;
`;

const StyledLogo = styled.div`
  flex: 0 0 200px;
  padding: 5px;
  border-right: 1px solid #eee;

  & img {
    width: 100%;
  }
`;

const Main = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  flex: 1 1;
  padding: 0 15px;
`;

const Left = styled.div`
  width: 100px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <Wrapper>
        <StyledLogo>
          <a href={HOMEPAGE}>
            <img src={logo} alt="logo" />
          </a>
        </StyledLogo>
        <Main>
          <Left></Left>
          <Right>
            <User />
          </Right>
        </Main>
      </Wrapper>
    );
  }
}

export default Header;