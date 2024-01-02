import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import Layout from './containers/Layout';
import Home from './pages/Home';
import Cliente from './pages/Clientes';
import Pedido from './pages/Pedidos';
import Produtos from './pages/Produtos';


// localhost:8080/blablabla
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/clientes",
        element: <Cliente/>
      },
      {
        path: "/pedidos",
        element: <Pedido/>
      },
      {
        path: "/produtos",
        element: <Produtos/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
