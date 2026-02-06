import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserPreferencesProvider } from './context/UserPreferencesContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserPreferencesProvider>
      <App />
    </UserPreferencesProvider>
  </React.StrictMode>,
)
