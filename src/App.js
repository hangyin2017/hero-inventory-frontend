import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import PAGES, { HOMEPAGE } from './pages';

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

const App = () => {
  const { Footer, Sider } = Layout;

  return (
    <Router>
      <Container>
        <Header />
        <Wrapper>
          <Sider>
            <Navbar />
          </Sider>
          <Main>
            <Switch>
              {Object.keys(PAGES).map((key) => (
                <Route
                  key={key}
                  exact={PAGES[key].exact}
                  path={PAGES[key].path}
                  component={PAGES[key].component}
                />
              ))}
              <Redirect path='/' to={HOMEPAGE.path} />
            </Switch>
            {/* <Footer /> */}
          </Main>
        </Wrapper>
      </Container>
    </Router>
  )
};

export default App;
