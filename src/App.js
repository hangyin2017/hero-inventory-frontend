import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './App.module.less';
import Inventory from './pages/Inventory';
import SalesOrders from './pages/SalesOrders';

function App() {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <div className={styles.app}>
      <Layout>
        <Sider className={styles.sider}>
          <Header className={styles.user}>User</Header>
          <Menu className={styles.sideMenu} theme="dark" defaultSelectedKeys={['3']}>
            <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="2">Inventory</Menu.Item>
            <Menu.Item key="3">SalesOrders</Menu.Item>
            <Menu.Item key="4">Contacts</Menu.Item>
            <Menu.Item key="5">Users</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <h2>Page Title</h2>
          </Header>
          <Content>
            {/* <Inventory /> */}
            <SalesOrders />
          </Content>
          <Footer>
            
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
