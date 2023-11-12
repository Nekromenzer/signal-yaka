import React from 'react'
import { Outlet, Navigate } from 'react-router'

const HandleAuth = () => {
  const auth = false
  if (!auth) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

export default HandleAuth
