import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`;

const Buttons = styled.div`
  display: flex;

  & > button {
    min-width: 35px;
    margin: 0 5px;
  }
`;

const Header = ({
  title,
  children,
}) => {
  return (
    <Wrapper>
      <span>{title}</span>
      <Buttons>
        {children}
      </Buttons>
    </Wrapper>
  );
};

export default Header;