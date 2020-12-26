import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Guard from './components/Guard';
import Private from './components/Private';
import withAuthentication, { withAuthenticationProvider } from './components/withAuthentication';
import compose from './utils/compose';
import ROUTES, { AUTH_ROUTE } from './Routes';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex: auto;
//   background: #f0f2f5;
//   overflow: hidden;
// `;

// const Main = styled.main`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   overflow: hidden;
// `;

const App = ({ authentication }) => {

  return (
    <Router>
      <Switch>
        <Route path={AUTH_ROUTE.path}>
          <AUTH_ROUTE.component />
        </Route>
        <Route path="/">
          <Guard>
            <Private />
          </Guard>
        </Route>
      </Switch>
    </Router>
  );
};

const EnhancedApp = compose(
  withAuthentication,
  withAuthenticationProvider,
)(App);

export default EnhancedApp;
