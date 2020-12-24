import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import withAuthentication from './components/withAuthentication';
import ROUTES from './Routes';

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

const App = ({ user }) => {
  const { Footer, Sider } = Layout;

  return (
    <Router>
      <Container>
        <Header user={user} />
        <Wrapper>
          <Sider>
            <Navbar />
          </Sider>
          <Main>
            <Switch>
              {Object.keys(ROUTES).map((key) => {
                const { exact, path, permissions, component } = ROUTES[key];
                const AUTH_PATH = ROUTES.authentication.path;

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
            {/* <Footer /> */}
          </Main>
        </Wrapper>
      </Container>
    </Router>
  )
};

export default withAuthentication(App);
