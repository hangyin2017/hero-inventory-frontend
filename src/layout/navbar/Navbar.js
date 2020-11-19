import { Menu } from "antd";
import React from "react";
import styles from "./Navbar.module.css";
import MenuItem from "./components/MenuItem";

const Navbar = () => {
  return (
    <Menu className={styles.sideMenu} theme="dark" defaultSelectedKeys={["1"]}>
      <MenuItem to="/">Dashboard</MenuItem>
      <MenuItem to="/inventory">Inventory</MenuItem>
      <MenuItem to="/orders">Orders</MenuItem>
      <MenuItem to="/contacts">Contacts</MenuItem>
      <MenuItem to="/users">Users</MenuItem>
      <MenuItem to="/authentication">Authentication</MenuItem>
    </Menu>
  );
};

export default Navbar;
