import React from 'react'
// import { Navigate } from 'react-router-dom'
import Home from '../pages/home/index'
import About from '../pages/about'
import Layout from '../pages/layout'
// const WeeklyReport = React.lazy(() => import('../pages/weekly-report/weekly-report'));

// const RequireAuth = ({ children }: { children: ReactNode }) => {
//     if (!localStorage.getItem(localStorageKey)) {
//         return <Navigate to="/login" replace />;
//     }
//     return <div>{children}</div>;
// };

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      //   {
      //     path: '/register',
      //     element: (
      //       <RequireAuth>
      //         <Register />
      //       </RequireAuth>
      //     ),
      //   },
      //   { path: '/register/inner', element: '<div>内部企业</div>' },
      //   { path: '/register/outer', element: '<div>外部企业</div>' },
    ],
  },
]
export default routes
