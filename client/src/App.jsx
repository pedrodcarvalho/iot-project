import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import SignUp from './pages/Signup/Signup';
import SignIn from './pages/Signin/Signin';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: 'signin',
    element: <SignIn />,
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

  useEffect(() => {
    const fetchServerEndpoint = async () => {
      try {
        await axios.get('http://localhost:5000/');
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchServerEndpoint();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
