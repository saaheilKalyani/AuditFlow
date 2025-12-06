// frontend/src/components/Projects/ProjectForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FrameworkSelect from './FrameworkSelect'
import api from '../../services/api'

const ProjectForm = () => {
  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const toggleFramework = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError(null)

  if (!title.trim()) {
    setError('Project title is required')
    return
  }
  if (selected.length === 0) {
    setError('Please select at least one framework')
    return
  }

  setLoading(true)
  try {
    const payload = {
      title: title.trim(),
      frameworks: selected
    }
    const resp = await api.post('/api/projects', payload)
    const project = resp?.data?.project

    if (!project || !project._id) {
      throw new Error('Invalid project response')
    }

    // FINAL: Redirect to the correct FE route
    navigate(`/gap-analysis/${project._id}`)
  } catch (err) {
    setError(err?.response?.data?.message || err.message || 'Failed to create project')
  } finally {
    setLoading(false)
  }
}

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>

      <div className="mb-4">
        <label htmlFor="projectTitle" className="block text-sm font-medium">Project Title</label>
        <input
          id="projectTitle"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="My ISO 27001 Compliance Project"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Frameworks</label>
        <FrameworkSelect selectedIds={selected} onToggle={toggleFramework} />
      </div>

      {error && <div className="mb-3 text-sm text-red-700">{error}</div>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
