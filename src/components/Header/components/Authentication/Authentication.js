import React from 'react';
import styled from 'styled-components';

const NakedButton = styled.button`
  margin: 20px;
  border: 1px solid #7f7f7f;
  text-align: center;
`;

const Authentication = () => {
  return (
    <>
      <NakedButton>
        Log In
      </NakedButton>
      <NakedButton>
        Sign Up
      </NakedButton>
    </>
  );
};

export default Authentication;