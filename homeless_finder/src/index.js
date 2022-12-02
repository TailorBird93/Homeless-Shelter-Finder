import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './pages/Register';
import App from './App';
import AuthProvider from './context/authContext';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const router= createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <App />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

