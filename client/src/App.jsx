import React, { useEffect } from 'react';
import axios from 'axios';

import './App.css';

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
        await axios.get('http://localhost:3001/')
          .then((res) => {
            console.log(res.data);
          });
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchServerEndpoint();
  }, []);

  return (
    <>
      <h1>Hello World!</h1>
    </>
  );
};

export default App;
