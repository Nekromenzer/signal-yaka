import React from 'react'
import { Outlet, Navigate } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Layout
