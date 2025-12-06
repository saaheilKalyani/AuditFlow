import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Landing from './pages/Landing'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/UI/ProtectedRoute'
import GapAnalysis from './pages/GapAnalysis'
import KYO from './pages/KYO'
import CreateProject from './pages/CreateProject'
import Frameworks from './pages/Frameworks'
import FrameworkInfo from './pages/FrameworkInfo';
import Mapping from './pages/Mapping';
import ReportViewer from './pages/ReportViewer'
import KnowledgeHub from "./pages/KnowledgeHub";
import Article from "./pages/Article";



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/knowledge" element={<KnowledgeHub />} />
          <Route path="/knowledge/:id" element={<Article />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/gap-analysis/:projectId" element={<GapAnalysis />} />
            <Route path="/kyo" element={<KYO />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/frameworks/:id" element={<FrameworkInfo />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/mapping/:projectId" element={<Mapping />} />
            <Route path="/reports/:projectId" element={<ReportViewer />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
