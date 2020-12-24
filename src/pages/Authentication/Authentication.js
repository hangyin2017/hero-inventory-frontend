import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './Routes';
import shield from './assets/shield.png';
import backgroundImage from './assets/bg.svg';

const Container = styled.div`
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: auto 100%;
  padding-top: 7%;
`;

const Wrapper = styled.div`
    width: 890px;
    min-height: 520px;
    background-color: #fff;
    box-shadow: 0px 2px 30px #ccc6;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    overflow: hidden;
`;

const Left = styled.div`
  width: 57%;
  min-height: 520px;
  float: left;
  border-right: 2px solid #f1f1f1;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 43%;
  padding: 40px;
  text-align: center;
`;

const Shield = styled.div`
`;

const ShieldImg = styled.div`
  margin: 0 auto 50px;

  & > img {
    height: 180px;
    width: 180px;
  }
`;

const ShieldTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ShieldText = styled.div`
  line-height: 24px;
`;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Wrapper>
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
              <ShieldImg><img src={shield} /></ShieldImg>
              <ShieldTitle>KEEP YOUR ACCOUNT SECURE</ShieldTitle>
              <ShieldText>
                OneAuth is our new in-house multi-factor authentication app.
                Shield your account with OneAuth now.
              </ShieldText>
            </Shield>
          </Right>
        </Wrapper>
      </Container>
    );
  }
}

export default Authentication;
