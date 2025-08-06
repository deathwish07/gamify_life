import { useState } from 'react'

import './App.css'
import { UserProvider } from './context/userContext'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import LifeStats from './components/LifeStats'
import XPChart from './components/XPChart'
import MoodPieChart from './components/MoodPieChart'
import ActivityHeatmap from './components/ActivityHeatmap'


function App() {

  return (
    <Router>
    <UserProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/stats" element={<LifeStats/>}/>
        <Route path="/trend" element={<XPChart/>}/>
        <Route path="/mood" element={<MoodPieChart/>}/>
        <Route path="/heatmap" element={<ActivityHeatmap/>}/>
      </Routes>  
    </UserProvider>
    </Router>
  )
}

export default App
