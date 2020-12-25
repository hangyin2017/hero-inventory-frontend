import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
`;

const LoadingApp = () => {
  return(
    <Container>
      <Spin size="large" />
      <Text>Loading Hero Inventory...</Text>
    </Container>
  );
}

export default LoadingApp;