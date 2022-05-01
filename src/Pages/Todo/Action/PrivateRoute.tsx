import React from "react";
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from "routes";

const PrivateRoute =() => {
  const auth= useSelector((state: RootState) =>state.auth);

  return auth.user ?  <Outlet /> : <Navigate to ={routes.login} />
  
};

  export default PrivateRoute;