import styled from 'styled-components';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
// import MenuItem from "./components/MenuItem";

const SideMenu = styled(Menu)`
  font-size: 16px;
`;

const PAGES = [
  {
    to: "/dashboard",
    name: "Dashboard",
  },
  {
    to: "/inventory",
    name: "Inventory",
  },
  {
    to: "/customers",
    name: "Customers",
  },
  {
    to: "/salesorders",
    name: "Sales Orders",
  },
  {
    to: "/suppliers",
    name: "Suppliers",
  },
  {
    to: "/purchaseorders",
    name: "Purchase Orders",
  },
  {
    to: "/users",
    name: "Users",
  },
  {
    to: "/authentication",
    name: "Sign In / Sign Out",
  },
]

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'nav-link--active',
})`
  display: block;
  /* padding: 0 16px; */

  &.nav-link--active {
    background-color: #1890ff;
    color: #fff;
  }
`;

const MenuItem = styled(Menu.Item)`
  padding: 0;
`;

const Navbar = () => (
  <SideMenu theme="dark" defaultSelectedKeys={[window.location.pathname]}>
    {PAGES.map(({ to, name }) => (
      <MenuItem key={to}>
        <StyledNavLink to={to}>{name}</StyledNavLink>
      </MenuItem>
    ))}
  </SideMenu>
);

export default Navbar;
