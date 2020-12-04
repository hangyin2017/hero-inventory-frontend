import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from './components/Navbar';
import pages from './pages';

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
              {pages.map((page) => (
                <Route
                  exact={page.exact}
                  path={page.path}
                  component={page.component}
                />
              ))}
              <Redirect path='/' to="/dashboard" />
            </Switch>
            <Footer />
          </Main>
        </Wrapper>
      </Container>
    </Router>
  )
};

export default App;
