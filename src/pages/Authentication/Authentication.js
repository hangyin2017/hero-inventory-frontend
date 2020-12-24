import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './Routes';
import backgroundImage from './assets/bg.svg';

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
      <Container>
        <Switch>
          {Object.keys(ROUTES).map((key) => (
            <Route
              key={key}
              exact={ROUTES[key].exact}
              path={ROUTES[key].path}
              component={ROUTES[key].component}
            />
          ))}
          <Redirect path='/auth' to={ROUTES.signIn.path} />
        </Switch>
      </Container>
    );
  }
}

export default Authentication;
