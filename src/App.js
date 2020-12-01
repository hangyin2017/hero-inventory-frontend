import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import Header from './components/Header';
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import SalesOrders from "./pages/SalesOrders";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import Users from "./pages/Users";
import Authentication from "./pages/Authentication";

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
              <Route exact path="/inventory" component={Inventory} />
              <Route exact path="/customers" component={Customers} />
              <Route exact path="/salesorders" component={SalesOrders} />
              <Route exact path="/suppliers" component={Suppliers} />
              <Route exact path="/purchaseorders" component={PurchaseOrders} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/authentication" component={Authentication} />
              <Route path="/" component={Dashboard} />
            </Switch>
            <Footer />
          </Main>
        </Wrapper>
      </Container>
    </Router>
  )
};

export default App;
