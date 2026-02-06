import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UserPreferences {
  category: string
  legacyWeight: number
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  setPreferences: (prefs: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  category: 'tmt',
  legacyWeight: 50,
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferencesState] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences')
    if (!saved) return defaultPreferences

    try {
      const parsed = JSON.parse(saved)
      return { ...defaultPreferences, ...parsed }
    } catch (error) {
      console.error('Failed to parse userPreferences from localStorage:', error)
      localStorage.removeItem('userPreferences')
      return defaultPreferences
    }
  })

  const setPreferences = (prefs: Partial<UserPreferences>) => {
    setPreferencesState((prev) => {
      const updated = { ...prev, ...prefs }
      localStorage.setItem('userPreferences', JSON.stringify(updated))
      return updated
    })
  }

  const resetPreferences = () => {
    setPreferencesState(defaultPreferences)
    localStorage.removeItem('userPreferences')
  }

  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences, resetPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider')
  }
  return context
}
