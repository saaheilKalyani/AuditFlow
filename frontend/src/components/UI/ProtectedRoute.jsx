// frontend/src/components/UI/ProtectedRoute.jsx
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

/**
 * Usage with React Router v6:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/gap-analysis" element={<GapAnalysis />} />
 * </Route>
 */
const ProtectedRoute = ({ redirectTo = '/login' }) => {
  const { user, token, loading } = useContext(AuthContext)

  // While checking auth, avoid redirect flash
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="text-sm text-gray-600">Checking authentication...</div>
      </div>
    )
  }

  if (!user && !token) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
