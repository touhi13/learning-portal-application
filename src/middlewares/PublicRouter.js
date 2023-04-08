import React from 'react'
import userAuth from '../hooks/userAuth'
import { Navigate } from 'react-router-dom';

const PublicRouter = ({children}) => {
    const isLoggedIn = userAuth();
  return !isLoggedIn ? children : <Navigate to={"/course-player/1"} />
}

export default PublicRouter