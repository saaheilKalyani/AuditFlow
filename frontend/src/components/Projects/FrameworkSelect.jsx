// frontend/src/components/Projects/FrameworkSelect.jsx
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FrameworkToggleCard from './FrameworkToggleCard'

const FrameworkSelect = ({ selectedIds = [], onToggle }) => {
  const [frameworks, setFrameworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const resp = await api.get('/api/frameworks')
        if (!mounted) return
        setFrameworks(resp.data || [])
      } catch (err) {
        console.error('Frameworks load error', err)
        if (!mounted) return
        setError('Failed to load frameworks')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="text-sm text-gray-600">Loading frameworks...</div>
  if (error) return <div className="text-sm text-red-600">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {frameworks.map((fw) => (
        <FrameworkToggleCard
          key={fw._id}
          framework={fw}
          selected={selectedIds.includes(fw._id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default FrameworkSelect
