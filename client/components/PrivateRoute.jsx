import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer.jsx';

const PrivateRoute = ({ isLoggedIn }) => {
  const location = useLocation();
  return isLoggedIn ? (
    <HomeContainer isLoggedIn={isLoggedIn} />
  ) : (
    <Navigate to={`/login`} replace state={{ location }} />
  );
};

export default PrivateRoute;
