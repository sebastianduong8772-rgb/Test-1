import React from 'react'
import { useUserPreferences } from '../context/UserPreferencesContext'

export default function MediaSlider() {
  const { preferences, setPreferences } = useUserPreferences()

  const getMediaLabel = (weight: number) => {
    if (weight < 35) return 'New Age Heavy'
    if (weight > 65) return 'Legacy Heavy'
    return 'Balanced'
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        🎭 Media Balance: {getMediaLabel(preferences.legacyWeight)}
      </label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-600 min-w-fit">📰 Legacy</span>
        <input
          type="range"
          min="0"
          max="100"
          value={preferences.legacyWeight}
          onChange={(e) => setPreferences({ legacyWeight: parseInt(e.target.value) })}
          className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-600 min-w-fit">New Age 🚀</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        {preferences.legacyWeight}% Legacy / {100 - preferences.legacyWeight}% New Age
      </p>
    </div>
  )
}
