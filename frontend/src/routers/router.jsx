import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/home';
import Login from '../components/Login';
import Register from '../components/Register';
import Cart from '../pages/products/Cart';
import Checkout from '../pages/products/Checkout';
import SingleProd from '../pages/products/SingleProd';
import PrivateRoute from './PrivateRoute';
import OrderPage from '../pages/products/OrderPage';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import Dashboard from '../pages/admindash/Dashboard';
import Rdashboard from '../pages/admindash/Rdashboard';
import ManageProducts from '../pages/admindash/manage/ManageProducts';
import AddProduct from '../pages/admindash/addproduct/AddProduct';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path : "/orders",
        element : <PrivateRoute><OrderPage /></PrivateRoute>,
      },
      {
        path : "/about",
        element : <div>About</div>,
      },
      {
        path : "/login",
        element: <Login />,

      },
      {
        path : "/register",
        element : <Register />,
      },
      {
        path : "/cart",
        element : <Cart />,
      },
      {
        path : "/checkout",
        element : <PrivateRoute><Checkout /></PrivateRoute>,
      },
      {
        path : "/products/:id",
        element : <SingleProd/>,
      },
      {
        path : "/admin",
        element : <AdminLogin />,
      }
      ,
      {
        path: 'dashboard',
        element: <AdminRoute><Dashboard/></AdminRoute>,
        children: [
          {
            path: '',
            element: <AdminRoute><Rdashboard/></AdminRoute>,
          },
          {
            path: 'add-product',
            element: <AdminRoute><AddProduct/></AdminRoute>,
          },
          {
            path: 'edit-product/:id',
            element: <AdminRoute><div>Edit Product</div></AdminRoute>,
          },
          {
            path: 'ManageProducts',
            element: <AdminRoute><ManageProducts/></AdminRoute>, 
          }
        ],
      },
    ],
  }
]);

export default router;