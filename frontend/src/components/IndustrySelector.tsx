import React from 'react'
import { useUserPreferences } from '../context/UserPreferencesContext'

export default function IndustrySelector() {
  const { preferences, setPreferences } = useUserPreferences()

  const categories = [
    { value: 'tmt', label: '🌐 TMT (Tech/Media/Telecom)' },
    { value: 'fintech', label: '💰 Fintech' },
    { value: 'healthcare', label: '🏥 Healthcare' },
    { value: 'manufacturing', label: '🏭 Manufacturing' },
    { value: 'retail', label: '🛍️ Retail' },
    { value: 'media', label: '📺 Media' },
    { value: 'automotive', label: '🚗 Automotive' },
    { value: 'energy', label: '⚡ Energy' },
  ]

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">📂 Industry Category</label>
      <select
        value={preferences.category}
        onChange={(e) => setPreferences({ category: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  )
}
