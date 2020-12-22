import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import SalesOrders from './pages/SalesOrders';
import Suppliers from './pages/Suppliers';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';
import Authentication from './pages/Authentication';

const PAGES = {
  dashboard: {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: Dashboard,
    inNavbar: true,
  },
  inventory: {
    path: '/inventory',
    exact: true,
    title: 'Inventory',
    component: Inventory,
    inNavbar: true,
  },
  customers: {
    path: '/customers',
    exact: true,
    title: 'Customers',
    component: Customers,
    inNavbar: true,
  },
  salesorders: {
    path: '/salesorders',
    exact: true,
    title: 'Sales Orders',
    component: SalesOrders,
    inNavbar: true,
  },
  suppliers: {
    path: '/suppliers',
    exact: true,
    title: 'Suppliers',
    component: Suppliers,
    inNavbar: true,
  },
  purchaseorders: {
    path: '/purchaseorders',
    exact: true,
    title: 'Purchase Orders',
    component: PurchaseOrders,
    inNavbar: true,
  },
  users: {
    path: '/users',
    exact: true,
    title: 'Users',
    component: Users,
    inNavbar: true,
  },
  authentication: {
    path: '/auth/signin',
    exact: false,
    title: 'Sign In / Sign Out',
    component: Authentication,
    inNavbar: true,
  },
};

const HOMEPAGE = PAGES.dashboard;

export default PAGES;
export { HOMEPAGE };