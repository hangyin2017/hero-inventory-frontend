import React from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import SalesOrders from './pages/SalesOrders';
import Suppliers from './pages/Suppliers';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';
import Authentication from './pages/Authentication';

const ROUTES = {
  dashboard: {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: <Dashboard />,
    inNavbar: true,
  },
  inventory: {
    path: '/inventory',
    exact: true,
    title: 'Inventory',
    component: <Inventory />,
    inNavbar: true,
  },
  customers: {
    path: '/customers',
    exact: true,
    title: 'Customers',
    component: <Customers />,
    inNavbar: true,
  },
  salesorders: {
    path: '/salesorders',
    exact: true,
    title: 'Sales Orders',
    component: <SalesOrders />,
    inNavbar: true,
  },
  suppliers: {
    path: '/suppliers',
    exact: true,
    title: 'Suppliers',
    component: <Suppliers />,
    inNavbar: true,
  },
  purchaseorders: {
    path: '/purchaseorders',
    exact: true,
    title: 'Purchase Orders',
    component: <PurchaseOrders />,
    inNavbar: true,
  },
  users: {
    path: '/users',
    exact: true,
    title: 'Users',
    component: <Users />,
    inNavbar: true,
  },
  authentication: {
    path: '/auth',
    exact: false,
    title: 'Sign In / Sign Out',
    component: <Authentication />,
    inNavbar: true,
  },
};

const HOMEPAGE = ROUTES.dashboard;

ROUTES.default = {
  path: '/',
  exact: false,
  component: <Redirect to={HOMEPAGE.path} />,
  inNavbar: false,
};

export default ROUTES;
export { HOMEPAGE };