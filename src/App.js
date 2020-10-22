import React from 'react';
import { Menu } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <Menu className="sideMenu" theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Inventory</Menu.Item>
          <Menu.Item key="3">Orders</Menu.Item>
          <Menu.Item key="4">Contacts</Menu.Item>
          <Menu.Item key="5">Users</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default App;
