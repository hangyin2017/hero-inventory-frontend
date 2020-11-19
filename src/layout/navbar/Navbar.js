import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import MenuItem from "./components/MenuItem";

const SideMenu = styled(Menu)`
  font-size: 16px;
`;

const Navbar = () => {
  return (
    <SideMenu theme="dark" defaultSelectedKeys={["1"]}>
      {/* <MenuItem to="/">Dashboard</MenuItem>
      <MenuItem to="/inventory">Inventory</MenuItem>
      <MenuItem to="/customers">Customers</MenuItem>
      <MenuItem to="/salesorders">Sales Orders</MenuItem>
      <MenuItem to="/suppliers">Suppliers</MenuItem>
      <MenuItem to="/purchaseorders">Purchase Orders</MenuItem>
      <MenuItem to="/users">Users</MenuItem>
      <MenuItem to="/authentication">Sign In / Sign Out</MenuItem> */}

      <Menu.Item key="1"><Link to="/"></Link>Dashboard</Menu.Item>
      <Menu.Item><Link to="/inventory"></Link>Inventory</Menu.Item>
      <Menu.Item><Link to="/customers"></Link>Customers</Menu.Item>
      <Menu.Item><Link to="/salesorders"></Link>Sales Orders</Menu.Item>
      <Menu.Item><Link to="/suppliers"></Link>Suppliers</Menu.Item>
      <Menu.Item><Link to="/purchaseorders"></Link>Purchase Orders</Menu.Item>
      <Menu.Item><Link to="/users"></Link>Users</Menu.Item>
      <Menu.Item><Link to="/authentication"></Link>Sign In / Sign Out</Menu.Item>
    </SideMenu>
  );
};

export default Navbar;
