import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Avatar } from 'antd';
import withAuthentication from '../../../../../withAuthentication';
import compose from '../../../../../../utils/compose';
import { UserOutlined } from '@ant-design/icons';
import { color } from '../../../../../../styles';

const Wrapper = styled.div`
`;

const Overlay = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Profile = styled.div`
  width: 360px;
  position: absolute;
  z-index: 3;
  top: 54px;
  background-color: #fff;
  box-shadow: -2px 5px 10px 1px rgba(0,0,0,.2);
  transition: all .5s ease-in-out;

  ${({ visible }) => visible ? css`
    right: 0;
  ` : css`
    right: -400px;
  `}
`;

const AvatarWrapper = styled.div`
  padding: 20px 20px;
  background-color: #f3f8fe;
`;

const UserInfo = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;

  & > div ~ div {
    margin-top: 5px;
  }
`;

const SignOutWrapper = styled.div`
  padding: 0 10px;
`;

const NakedButton = styled.button`
  padding: 10px;
  background: none;
  border: none;
  outline: none;
  color: ${color.dangerous};
  cursor: pointer;
`;

const User = ({ authentication }) => {
  const [showProfile, setShow] = useState(false);
  const { user, signOut } = authentication;
  const { username = 'user', id = 'unknown', email = 'email' } = user;
  return (
    <Wrapper>
      <div onClick={(e) => {
        e.stopPropagation();
        setShow(!showProfile);
      }}>
        <Avatar style={{ backgroundColor: "lightblue" }} icon={<UserOutlined />} />
      </div>
      <Profile visible={showProfile}>
        {showProfile && <Overlay onClick={() => setShow(false)} />}
        <AvatarWrapper>
          <Avatar size={64} icon={<UserOutlined />} />
        </AvatarWrapper>
        <UserInfo>
          <h4>{username}</h4>
          <div>User ID : {id}</div>
          <div>{email}</div>
        </UserInfo>
        <SignOutWrapper>
          <NakedButton onClick={signOut}>Sign Out</NakedButton>
        </SignOutWrapper>
      </Profile>
    </Wrapper>
  );
};

const EnhancedUser = compose(
  withAuthentication,
)(User);

export default EnhancedUser;