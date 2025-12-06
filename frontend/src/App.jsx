// Example usage snippet - add into your router setup (do NOT overwrite if you already have App.jsx)
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/UI/ProtectedRoute'
import GapAnalysis from './pages/GapAnalysis' // example protected page

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/gap-analysis" element={<GapAnalysis />} />
            {/* add other protected routes here */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
