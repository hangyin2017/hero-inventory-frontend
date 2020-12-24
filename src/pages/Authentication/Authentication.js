import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './Routes';

const Layout = styled.div`
  height: 80vh;
  width: 80vw;
  display: flex;
`;

const Left = styled.div`
  width: 60%;
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Shield = styled.div`
  bottom: 20px;
  width: 70%;
`;

const ShieldTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Left>
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
        </Left>
        <Right>
          <Shield>
            <ShieldTitle>KEEP YOUR ACCOUNT SECURE</ShieldTitle>
            <div>
              OneAuth is our new in-house multi-factor authentication app.
              Shield your account with OneAuth now.
            </div>
          </Shield>
        </Right>
      </Layout>
    );
  }
}

export default Authentication;
