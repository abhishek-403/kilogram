import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../localStorageManager';
import { Navigate, Outlet } from 'react-router-dom';

function NotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN);
    return (
    user? <Navigate to="/" /> : <Outlet/>
  )
}

export default NotLoggedIn
