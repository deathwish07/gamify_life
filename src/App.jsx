import { useState } from 'react'

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
