import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { EditOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;

  & > button {
    width: 35px;
    padding: 0;
    font-size: 18px;
  }
`;

const Header = ({
  onEditButtonClick,
  loading,
}) => {
  return (
    <Wrapper>
      <span>Item Details</span>
      <Button
        loading={loading}
        icon={<EditOutlined />}
        onClick={onEditButtonClick}
      />
    </Wrapper>
  );
};

export default Header;