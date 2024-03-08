import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchHome = async () => {
      try {
        await axios.get('http://localhost:5000/home', {
          headers: {
            Authorization: token
          }
        })
          .then((res) => {
            setUsername(res.data.user.username);
          });
      }
      catch (err) {
        window.location.href = `/error?message=${err.message}&status=${err.response.status}`;
      }
    };

    fetchHome();
  }, []);

  return (
    <>
      {username && <h1>Welcome {username}</h1>}
    </>
  );
};

export default Home;
