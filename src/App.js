import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Guard from './components/Guard';
import Private from './components/Private';
import { AuthenticationProvider } from './components/withAuthentication';
import { AUTH_ROUTE } from './routes.ts';

const App = () => {
  return (
    <AuthenticationProvider>
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
    </AuthenticationProvider>
  );
};

export default App;
