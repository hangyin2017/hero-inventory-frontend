import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import LoadingApp from './pages/LoadingApp';
import withAuthentication, { withAuthenticationProvider } from './components/withAuthentication';
import ROUTES, { AUTH_ROUTE } from './Routes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
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
      const AUTH_PATH = AUTH_ROUTE.path;

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

const App = ({ authentication, loading }) => {
  const { user } = authentication;
  const { Footer, Sider } = Layout;

  if(loading) {
    return <LoadingApp />;
  }

  return (
    <Router>
      <Switch>
        <Route
          key="auth"
          exact={AUTH_ROUTE.exact}
          path={AUTH_ROUTE.path}
          children={<AUTH_ROUTE.component user={user} />}
        />
        <Route key="private" path="/">
          <Container>
            <Header user={user} />
            <Wrapper>
              <Sider>
                <Navbar />
              </Sider>
              <Main>
                {getRoutes(ROUTES, AUTH_ROUTE.path, user)}
                {/* <Footer /> */}
              </Main>
            </Wrapper>
          </Container>
        </Route>
      </Switch>
    </Router>
  )
};

const AppWithAuthentication = withAuthentication(App);
const AppWithAuthenticationProvider = withAuthenticationProvider(AppWithAuthentication);

export default AppWithAuthenticationProvider;
