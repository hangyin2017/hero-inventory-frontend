import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MenuItem = ({ to, children }) => {
  return (
    <Menu.Item>
      <Link to={to}></Link>Users
    </Menu.Item>
  );
};

export default MenuItem;
