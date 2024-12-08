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
        path : "/dashboard",
        element : <div>Dashboard</div>,
        children: [
          {
      }]
      },
    ],
  }
]);

export default router;