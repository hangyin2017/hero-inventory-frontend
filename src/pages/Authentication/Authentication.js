import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './Routes';
import backgroundImage from './assets/bg.svg';
import AuthenticationContext from '../../components/withAuthentication/AuthenticationContext';

const Container = styled.div`
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: auto 100%;
  padding-top: 7%;
`;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthenticationContext.Consumer>
        {(authentication) => (
          <Container>
            <Switch>
              {Object.keys(ROUTES).map((key) => {
                const route = ROUTES[key];
                const { exact, path } = route;

                return (
                  <Route
                    key={key}
                    exact={exact}
                    path={path}
                  >
                    <route.component authentication={authentication} />
                  </Route>
                );
              })}
              <Redirect path='/auth' to={ROUTES.signIn.path} />
            </Switch>
          </Container>
        )}
      </AuthenticationContext.Consumer>
    );
  }
}

export default Authentication;
