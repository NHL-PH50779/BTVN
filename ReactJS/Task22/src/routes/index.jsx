import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import authRoutes from './authRoutes'
import NotFoundPage from '../pages/Client/NotFoundPage'
import clientRoutes from './clientRoutes'
import adminRoutes from './adminRoutes'

let router = createBrowserRouter([
    ...authRoutes,
    ...clientRoutes,
    ...adminRoutes,
    {path:"*",Component:NotFoundPage}
])

const AppRouter =()=> {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default AppRouter
