import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import withAuthentication from '../../../../../withAuthentication';
import compose from '../../../../../../utils/compose';
import { UserOutlined } from '@ant-design/icons';
import { color } from '../../../../../../styles';

const Dropdown = styled.div`
  width: 360px;
  position: absolute;
  z-index: 3;
  top: 54px;
  right: 0;
  background-color: #fff;
  box-shadow: -2px 5px 10px 1px rgba(0,0,0,.2);
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
  border: none;
  padding: 10px;
  background: none;
  border: none;
  outline: none;
  color: ${color.dangerous};
`;

const User = ({ authentication }) => {
  const [showProfile, setShow] = useState(false);
  const { username = 'user', id = 'unknown', email = 'email' } = authentication.user;
  return (
    <div>
      <div onClick={() => setShow(!showProfile)} >
        <Avatar style={{ backgroundColor: "lightblue" }} icon={<UserOutlined />} />
      </div>
      {showProfile ? (
        <Dropdown>
          <AvatarWrapper>
            <Avatar size={64} icon={<UserOutlined />} />
          </AvatarWrapper>
          <UserInfo>
            <h4>{username}</h4>
            <div>User ID : {id}</div>
            <div>{email}</div>
          </UserInfo>
          <SignOutWrapper>
            <NakedButton>Sign out</NakedButton>
          </SignOutWrapper>
        </Dropdown>
      ) : null}
    </div>
  );
};

const EnhancedUser = compose(
  withAuthentication,
)(User);

export default EnhancedUser;