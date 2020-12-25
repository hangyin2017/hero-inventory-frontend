import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './Routes';
import backgroundImage from './assets/bg.svg';
import { breakpoints } from '../../styles';

const Container = styled.div`
  height: 100vh;

  @media (min-width: ${breakpoints.sm}) {
    padding-top: 7%;
    background-image: url(${backgroundImage});
    background-size: auto 100%;
  }
`;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Container>
          <Switch>
            {Object.keys(ROUTES).map((key) => {
              const route = ROUTES[key];
              const { exact, path } = route;

              return (
                <Route key={key} exact={exact} path={path}>
                  <route.component />
                </Route>
              );
            })}
            <Redirect path='/auth' to={ROUTES.signIn.path} />
          </Switch>
        </Container>
      </>
    );
  }
}

export default Authentication;
