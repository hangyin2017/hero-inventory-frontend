import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import withAuthentication from '../../../../../withAuthentication';
import compose from '../../../../../../utils/compose';
import { UserOutlined } from '@ant-design/icons';

const Dropdown = styled.div`
  width: 360px;
  height: 240px;
  position: absolute;
  z-index: 3;
  right: 0;
  padding: 10px 20px;
  background-color: #eefaff;
`;

const Logout = styled.div`
  color: red;
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
          <Avatar size={64} icon={<UserOutlined />} />
          <div>{username}</div>
          <div>User ID : {id}</div>
          <div>{email}</div>
          <Logout onClick>Log out</Logout>
        </Dropdown>
      ) : null}
    </div>
  );
};

const EnhancedUser = compose(
  withAuthentication,
)(User);

export default EnhancedUser;