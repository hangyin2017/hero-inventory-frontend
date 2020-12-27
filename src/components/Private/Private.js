import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Navbar from '../Navbar';
import Guard from '../Guard';
import ROUTES, { HOMEPAGE } from '../../Routes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: auto;
  background: #f0f2f5;
  overflow: hidden;
`;

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const getRoutes = (ROUTES) => (
  Object.keys(ROUTES).map((key) => {
    const { exact, path, permissions, component: Component } = ROUTES[key];

    return (
      <Route key={key} exact={exact} path={path}>
        <Guard permissions={permissions}>
          <Component />
        </Guard>
      </Route>
    );
  })
);

const Private = () => {
  const { Sider } = Layout;

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Sider>
          <Navbar />
        </Sider>
        <Main>
          <Switch>
            {getRoutes(ROUTES)}
            <Redirect to={HOMEPAGE.path} />
          </Switch>
        </Main>
      </ContentWrapper>
    </Container>
  );
};

export default Private;
