import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Navbar from '../Navbar';
import withAuthentication from '../withAuthentication';
import compose from '../../utils/compose';
import ROUTES, { AUTH_ROUTE } from '../../Routes';

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

const getRoutes = (ROUTES, AUTH_PATH, user) => (
  <Switch>
    {Object.keys(ROUTES).map((key) => {
      const { exact, path, permissions, component } = ROUTES[key];

      return (<Route
        key={key}
        exact={exact}
        path={path}
        render={(props) => (
          !!user || !permissions || path === AUTH_PATH ? (
            component
          ) : (
            <Redirect to={{
              pathname: AUTH_PATH,
              state: { from: props.location },
            }} />
          )
        )}
      />);
    })}
  </Switch>
);

const Private = ({
  authentication,
}) => {
  const { Sider } = Layout;
  const { user } = authentication;
  const AUTH_PATH = AUTH_ROUTE.path;

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Sider>
          <Navbar />
        </Sider>
        <Main>
          {getRoutes(ROUTES, AUTH_PATH, user)}
        </Main>
      </ContentWrapper>
    </Container>
  )
}

const EnhancedPrivate = compose(
  withAuthentication,
)(Private);

export default EnhancedPrivate;
