import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      Đây là trang Admin
      <Outlet />
    </div>
  )
}

export default AdminLayout
