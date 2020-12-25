import React from 'react';
import styled from 'styled-components';
import Shield from './components/Shield';
import { breakpoints } from '../../../../styles';

const Box = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: #fff;
  overflow: hidden;

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
    width: 500px;
    margin: 0 auto;
    box-shadow: 0px 2px 30px #ccc6;
  }

  @media (min-width: ${breakpoints.lg}) {
    width: 890px;
  }
`;

const Main = styled.main`
  flex: 0 0;
`;

const Right = styled.div`
  display: none;
  flex: 1 1;
  padding: 40px;
  border-left: 2px solid #f1f1f1;
  text-align: center;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = ({
  showRight,
  children,
}) => {
  return (
    <>
      {showRight ? (
        <Box>
          <Main>
            {children}
          </Main>
          <Right>
            <Shield />
          </Right>
        </Box>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default Container;