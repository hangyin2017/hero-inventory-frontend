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
    permissions: ['admin', 'sales', 'trainee'],
  },
  inventory: {
    path: '/inventory',
    exact: true,
    title: 'Inventory',
    component: <Inventory />,
    inNavbar: true,
    permissions: ['admin', 'sales', 'trainee'],
  },
  customers: {
    path: '/customers',
    exact: true,
    title: 'Customers',
    component: <Customers />,
    inNavbar: true,
    permissions: ['admin', 'sales', 'trainee'],
  },
  salesorders: {
    path: '/salesorders',
    exact: true,
    title: 'Sales Orders',
    component: <SalesOrders />,
    inNavbar: true,
    permissions: ['admin', 'sales', 'trainee'],
  },
  suppliers: {
    path: '/suppliers',
    exact: true,
    title: 'Suppliers',
    component: <Suppliers />,
    inNavbar: true,
    permissions: ['admin', 'sales', 'trainee'],
  },
  purchaseorders: {
    path: '/purchaseorders',
    exact: true,
    title: 'Purchase Orders',
    component: <PurchaseOrders />,
    inNavbar: true,
    permissions: ['admin', 'sales', 'trainee'],
  },
  users: {
    path: '/users',
    exact: true,
    title: 'Users',
    component: <Users />,
    inNavbar: true,
    permissions: ['admin'],
  },
};

const HOMEPAGE = ROUTES.dashboard;

ROUTES.default = {
  path: '/',
  exact: false,
  component: <Redirect to={HOMEPAGE.path} />,
  inNavbar: false,
};

const AUTH_ROUTE = {
  path: '/auth',
  exact: false,
  component: Authentication,
}

export default ROUTES;
export { HOMEPAGE, AUTH_ROUTE };