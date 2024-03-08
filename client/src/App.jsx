import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignUp from './pages/Signup/Signup';
import SignIn from './pages/Signin/Signin';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: 'signin',
    element: <SignIn />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/error',
    element: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

const App = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      console.log('Received message:', message);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
