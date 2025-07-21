import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Wifi, Battery, BatteryCharging, Volume2, Volume, VolumeX, Search } from 'lucide-react'
import { format } from 'date-fns'
import './MenuBar.css'

const MenuBar = ({ currentTime }) => {
  const [batteryLevel, setBatteryLevel] = useState(null)
  const [batteryCharging, setBatteryCharging] = useState(false)
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    // Battery API fallback handling
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100))
        setBatteryCharging(battery.charging)
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
        battery.addEventListener('chargingchange', () => {
          setBatteryCharging(battery.charging)
        })
      })
    } else {
      setBatteryLevel(85)
      setBatteryCharging(false)
    }
  }, [])

  useEffect(() => {
    // Poll system volume via IPC from our preload script
    const fetchVolume = async () => {
      try {
        const newVolume = await window.electronAPI.getVolume()
        console.log("Fetched volume:", newVolume)
        setVolume(newVolume)
      } catch (error) {
        console.error("Error getting volume:", error)
      }
    }
    fetchVolume()
    const interval = setInterval(fetchVolume, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => format(date, 'EEE MMM d  h:mm a')

  const chooseVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} color="#ff4d4d" /> // Mute
    if (volume > 0 && volume < 50) return <Volume size={16} color="#f0c674" /> // Low volume
    return <Volume2 size={16} color="#a6e22e" /> // High volume
  }

  return (
    <motion.div 
      className="menu-bar glass"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Apple logo and app menu */}
      <div className="menu-left">
        <div className="apple-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
        <div className="app-name">FuturisticOS</div>
      </div>

      {/* Center - Search */}
      <div className="menu-center">
        <div className="search-container glass-subtle">
          <Search size={16} />
          <input type="text" placeholder="Spotlight Search" className="search-input" />
        </div>
      </div>

      {/* Right side - System status */}
      <div className="menu-right">
        <div className="status-item battery">
          {batteryCharging ? <BatteryCharging size={18} /> : <Battery size={18} />}
          <span>{batteryLevel !== null ? `${batteryLevel}%` : '--'}</span>
        </div>
        <div className="status-item">
          <Wifi size={16} />
        </div>
        <div className="status-item">
          {chooseVolumeIcon()}
          <span>{volume}%</span>
        </div>
        <div className="status-item time">
          {formatTime(currentTime)}
        </div>
      </div>
    </motion.div>
  )
}

export default MenuBar
