import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7;
  text-align: center;
`;

const Logo = styled.div`
  flex: 0 0 200px;
  padding: 15px 15px;
  border-right: 1px solid #eee;
`;

const Main = styled.div`
  display: flex;
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

const Avatar = styled.div`
  display: flex;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: blue;
  color: #fff;
`;

const Header = ({ user }) => {
  console.log(user);
  return (
    <Wrapper>
      <Logo>
        Logo
      </Logo>
      <Main>
        <Left>
        </Left>
        <Right>
          <span>{user?.username}</span>
          <Avatar>
            A
          </Avatar>
        </Right>
      </Main>
    </Wrapper>
  );
};

export default Header;