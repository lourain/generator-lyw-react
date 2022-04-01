import React, { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { localStorageKey } from '../context/auth-context'
import Home from '@/page/home'
import Layout from '@/page/layout'
import About from '@/page/about'

// const RequireAuth = ({ children }: { children: ReactNode }) => {
//   if (!localStorage.getItem(localStorageKey)) {
//     return <Navigate to="/login" replace />
//   }
//   return <div>{children}</div>
// }

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: '/about', element: <About /> },
      { path: '/register/inner', element: '<div>内部企业</div>' },
      { path: '/register/outer', element: '<div>外部企业</div>' }
    ],
  },
]
export default routes
