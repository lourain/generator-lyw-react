import React from 'react'
import { useRoutes } from 'react-router-dom'
// import logo from './logo.svg'
import './App.less'
import { AuthProvider } from './context/auth-context'
import routes from './routes'

function App() {
  const route = useRoutes(routes)
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
      <AuthProvider>{route}</AuthProvider>
    </div>
  )
}

export default App
