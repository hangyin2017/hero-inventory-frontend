import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import SalesOrders from "./pages/SalesOrders";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import Users from "./pages/Users";
import Authentication from "./pages/Authentication";
import styles from "./App.module.less";

const App = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Router>
      <div className={styles.app}>
        <Layout>
          <Sider className={styles.sider}>
            <Header className={styles.user}>User</Header>
            <Navbar />
          </Sider>
          <Layout>
            {/* <Header className={styles.header}>
              <h2>Page Title</h2>
            </Header> */}
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
