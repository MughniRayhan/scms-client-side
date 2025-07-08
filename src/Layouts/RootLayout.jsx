import React from 'react'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default RootLayout