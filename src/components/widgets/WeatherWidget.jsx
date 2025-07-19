import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'
import './WeatherWidget.css'

const WeatherWidget = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [holdTimer, setHoldTimer] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Mock weather data - in a real app, this would come from an API
  const weatherData = {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    location: 'San Francisco'
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (!isEditMode) {
      const timer = setTimeout(() => {
        setIsEditMode(true)
      }, 2000) // Reduced to 2 seconds for better UX
      setHoldTimer(timer)
    }
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    if (holdTimer) {
      clearTimeout(holdTimer)
      setHoldTimer(null)
    }
  }

  const handleMouseLeave = (e) => {
    if (holdTimer) {
      clearTimeout(holdTimer)
      setHoldTimer(null)
    }
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    if (!isEditMode) {
      const timer = setTimeout(() => {
        setIsEditMode(true)
      }, 2000)
      setHoldTimer(timer)
    }
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    if (holdTimer) {
      clearTimeout(holdTimer)
      setHoldTimer(null)
    }
  }

  const handleDragEnd = (event, info) => {
    // Save the final position when drag ends
    setPosition({ x: info.point.x, y: info.point.y })
  }

  const handleLockWidget = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsEditMode(false)
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return <Sun size={32} color="#ff9500" />
      case 'Partly Cloudy':
        return <Cloud size={32} color="#007aff" />
      case 'Rainy':
        return <CloudRain size={32} color="#30d158" />
      default:
        return <Cloud size={32} color="#007aff" />
    }
  }

  return (
    <motion.div
      className={`weather-widget glass hover-lift ${isEditMode ? 'widget-jiggle' : ''}`}
      drag={isEditMode}
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: 1000,
        top: 40,
        bottom: 500
      }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      whileHover={!isEditMode ? { scale: 1.02 } : {}}
      whileDrag={{ scale: 1.05, zIndex: 1000 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isEditMode ? 'grab' : 'default',
        position: 'absolute',
        top: '250px',
        right: '20px',
        zIndex: isEditMode ? 1000 : 10
      }}
    >
      <div className="weather-header">
        <div className="weather-icon">
          {getWeatherIcon(weatherData.condition)}
        </div>
        <div className="weather-temp">
          {weatherData.temperature}°
        </div>
      </div>

      <div className="weather-condition">
        {weatherData.condition}
      </div>

      <div className="weather-location">
        {weatherData.location}
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <Wind size={16} />
          <span>{weatherData.windSpeed} mph</span>
        </div>
        <div className="weather-detail">
          <span>💧</span>
          <span>{weatherData.humidity}%</span>
        </div>
      </div>

      <div className="weather-glow"></div>

      {isEditMode && (
        <motion.button
          className="widget-lock-button"
          onClick={handleLockWidget}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✓
        </motion.button>
      )}
    </motion.div>
  )
}

export default WeatherWidget
