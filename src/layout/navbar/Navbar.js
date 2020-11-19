import { Menu } from "antd";
import React from "react";
import styles from "./Navbar.module.css";
import MenuItem from "./components/MenuItem";

const Navbar = () => {
  return (
    <Menu className={styles.sideMenu} theme="dark" defaultSelectedKeys={["1"]}>
      <MenuItem to="/">Dashboard</MenuItem>
      <MenuItem to="/inventory">Inventory</MenuItem>
      <MenuItem to="/customers">Customers</MenuItem>
      <MenuItem to="/salesorders">Sales Orders</MenuItem>
      <MenuItem to="/suppliers">Suppliers</MenuItem>
      <MenuItem to="/purchaseorders">Purchase Orders</MenuItem>
      <MenuItem to="/users">Users</MenuItem>
      <MenuItem to="/authentication">Sign In / Sign Out</MenuItem>
    </Menu>
  );
};

export default Navbar;
