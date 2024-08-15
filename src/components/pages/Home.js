import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ThoughtToCode from '../ThoughtToCode';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1>Welcome to NeuralDev</h1>
      <ThoughtToCode />
    </>
  );
};

export default Home;