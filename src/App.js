import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.less";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Navbar from "./layout/Navbar";
import Authentication from "./pages/Authentication";
function App() {
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
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/inventory" component={Inventory} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/contacts" component={Contacts} />
                <Route exact path="/users" component={Users} />
                <Route
                  exact
                  path="/authentication"
                  component={Authentication}
                />
              </Switch>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
