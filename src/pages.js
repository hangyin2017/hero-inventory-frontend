import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import SalesOrders from './pages/SalesOrders';
import Suppliers from './pages/Suppliers';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';
import Authentication from './pages/Authentication';

export default [
  {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: Dashboard,
    inNavbar: true,
  },
  {
    path: '/inventory',
    exact: true,
    title: 'Inventory',
    component: Inventory,
    inNavbar: true,
  },
  {
    path: '/customers',
    exact: true,
    title: 'Customers',
    component: Customers,
    inNavbar: true,
  },
  {
    path: '/salesorders',
    exact: true,
    title: 'Sales Orders',
    component: SalesOrders,
    inNavbar: true,
  },
  {
    path: '/suppliers',
    exact: true,
    title: 'Suppliers',
    component: Suppliers,
    inNavbar: true,
  },
  {
    path: '/purchaseorders',
    exact: true,
    title: 'Purchase Orders',
    component: PurchaseOrders,
    inNavbar: true,
  },
  {
    path: '/users',
    exact: true,
    title: 'Users',
    component: Users,
    inNavbar: true,
  },
  {
    path: '/authentication',
    exact: true,
    title: 'Sign In / Sign Out',
    component: Authentication,
    inNavbar: true,
  },
];