import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { EditOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;

  & > h2 {
    margin: 0;
  }

  & > button {
    padding: 0;
    font-size: 18px;
  }
`;

const EditIcon = styled(EditOutlined)`
  width: 40px;
  height: 35px;
  padding: 0;
`;

const Header = () => {
  return (
    <Wrapper>
      <h2>Item Details</h2>
      <Button >
        <EditIcon />
      </Button>
    </Wrapper>
  );
};

export default Header;