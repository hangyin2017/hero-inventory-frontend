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
import styles from "./App.module.less";

const Main = styled.main`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const App = () => {
  const { Footer, Sider } = Layout;

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Layout>
          <Sider className={styles.sider}>
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
        </Layout>
      </div>
    </Router>
  )
};

export default App;
