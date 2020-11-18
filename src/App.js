import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.less";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import SalesOrders from "./pages/SalesOrders";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import Users from "./pages/Users";
import Authentication from "./pages/Authentication";
import Navbar from "./layout/Navbar";
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './App.module.less';
import Inventory from './pages/Inventory';
import SalesOrders from './pages/SalesOrders';

const App = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Router>
      <div className={styles.app}>
        <Layout>
          <Sider className={styles.sider}>
            <Header className={styles.user}>User</Header>
            <Menu
              className={styles.sideMenu}
              theme="dark"
              defaultSelectedKeys={["1"]}
            >
              <Navbar />
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <h2>Page Title</h2>
            </Header>
            <Content>
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
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    </Router>
  )
};

export default App;
