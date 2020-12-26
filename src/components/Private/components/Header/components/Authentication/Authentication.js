import React from 'react';
import styled from 'styled-components';
import withAuthentication from '../../../../../withAuthentication';

const NakedButton = styled.button`
  margin: 20px;
  background-color: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

const Authentication = ({ authentication }) => {
  return (
    <>
      <NakedButton onClick={authentication.signOut}>
        Sign Out
      </NakedButton>
    </>
  );
};

export default withAuthentication(Authentication);