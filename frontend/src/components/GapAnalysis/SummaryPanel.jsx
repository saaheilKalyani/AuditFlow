// frontend/src/components/GapAnalysis/SummaryPanel.jsx
import React, { useState } from 'react'
import ScoreBar from './ScoreBar'
import MissingControls from './MissingControls'
import Recommendations from './Recommendations'
import api from '../../services/api'

const SummaryPanel = ({ projectId, summary }) => {
  const [downloading, setDownloading] = useState({}) // key -> bool
  const [err, setErr] = useState(null)

  const downloadReport = async (type) => {
    // type: 'json' | 'csv' | 'pdf'
    setErr(null)
    setDownloading((s) => ({ ...s, [type]: true }))
    try {
      const endpoint = `/api/reports/${projectId}/${type}`
      const resp = await api.get(endpoint, { responseType: 'blob' })
      const blob = new Blob([resp.data], { type: resp.headers?.['content-type'] || undefined })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url

      // filename
      const filename = `report-${projectId}.${type === 'json' ? 'json' : type === 'csv' ? 'csv' : 'pdf'}`
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Download failed', e)
      setErr('Download failed. Try again.')
    } finally {
      setDownloading((s) => ({ ...s, [type]: false }))
    }
  }

  return (
    <div className="bg-white border rounded p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ScoreBar score={summary?.score ?? 0} />
          <div className="mt-4 text-sm text-gray-600">
            Total controls: {summary?.totalControls ?? '-'}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Answered: {summary?.answered ?? '-'}
          </div>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-medium mb-2">Missing Controls</h4>
          <MissingControls missing={summary?.missing ?? []} />
        </div>

        <div className="md:col-span-1">
          <h4 className="font-medium mb-2">Recommendations</h4>
          <Recommendations recommendations={summary?.recommendations ?? []} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => downloadReport('json')}
          disabled={downloading.json}
          className="px-3 py-1 border rounded text-sm"
        >
          {downloading.json ? 'Downloading...' : 'Export JSON'}
        </button>

        <button
          onClick={() => downloadReport('csv')}
          disabled={downloading.csv}
          className="px-3 py-1 border rounded text-sm"
        >
          {downloading.csv ? 'Downloading...' : 'Export CSV'}
        </button>

        <button
          onClick={() => downloadReport('pdf')}
          disabled={downloading.pdf}
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
        >
          {downloading.pdf ? 'Downloading...' : 'Export PDF'}
        </button>

        {err && <div className="text-sm text-red-600 ml-3">{err}</div>}
      </div>
    </div>
  )
}

export default SummaryPanel
