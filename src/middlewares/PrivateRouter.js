import React from 'react'
import userAuth from '../hooks/userAuth'
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const isLoggedIn = userAuth();
  return isLoggedIn ? children : <Navigate to={"/"} />
}

export default PrivateRouter