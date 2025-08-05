import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserProvider } from './context/userContext'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <UserProvider>
      <Dashboard/>
    </UserProvider>
  )
}

export default App
