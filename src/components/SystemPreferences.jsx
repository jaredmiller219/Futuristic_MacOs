import React, { useState, useEffect } from 'react'
import './SystemPreferences.css'

const NOTIFICATIONS_KEY = 'notificationsEnabled'

export default function SystemPreferences({ onClose }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(NOTIFICATIONS_KEY)
    if (saved !== null) {
      setNotificationsEnabled(saved === 'true')
    }
  }, [])

  const handleToggle = () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    localStorage.setItem(NOTIFICATIONS_KEY, newValue)
    // Notify parent (App.jsx) immediately
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('notificationSettingChanged', { detail: newValue }))
    }
  }

  return (
    <div className="system-preferences-window">
      <div className="header">
        <span>System Preferences</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="content">
        <h2>Notifications</h2>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggle}
          />
          Enable Notifications
        </label>
      </div>
    </div>
  )
}
