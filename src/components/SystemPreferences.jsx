import React, { useState, useEffect } from 'react'
import './SystemPreferences.css'

const NOTIFICATIONS_KEY = 'notificationsEnabled'

export default function SystemPreferences({ onClose, onToggleNotifications }) {
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
    if (onToggleNotifications) {
      onToggleNotifications(newValue)
    }
  }

  return (
    <div className="window-content" style={{ height: '100%', background: 'rgba(0,0,0,0.2)', color: '#fff', padding: '24px 16px' }}>
      <h2 style={{ marginBottom: '16px' }}>System Preferences</h2>
      <div style={{ marginBottom: '24px' }}>
        <h3>Notifications</h3>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggle}
          />
          Enable Notifications
        </label>
      </div>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: '1.5em', cursor: 'pointer' }}>×</button>
    </div>
  )
}
