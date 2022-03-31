import React from 'react'
// import logo from './logo.svg'
import './App.less'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/auth-context'

function App() {
  const route = useRoutes(routes)
  return <AuthProvider>{route}</AuthProvider>
}

export default App
