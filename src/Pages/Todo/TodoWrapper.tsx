import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TodoWrapper() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}
