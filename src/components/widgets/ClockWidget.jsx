import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import './ClockWidget.css'

const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isEditMode, setIsEditMode] = useState(false)
  const [holdTimer, setHoldTimer] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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

  const handleLockWidget = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsEditMode(false)
  }

  const formatTime = (date) => {
    return format(date, 'h:mm:ss a')
  }

  const formatDate = (date) => {
    return format(date, 'EEEE, MMMM do')
  }

  return (
    <motion.div
      className={`clock-widget glass hover-lift ${isEditMode ? 'widget-jiggle' : ''}`}
      drag={isEditMode}
      dragMomentum={false}
      whileHover={!isEditMode ? { scale: 1.02 } : {}}
      whileDrag={{ scale: 1.05 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isEditMode ? 'grab' : 'default',
        position: 'absolute',
        top: '80px',
        right: '20px',
        zIndex: isEditMode ? 1000 : 10
      }}
    >
      <div className="clock-time">
        {formatTime(currentTime)}
      </div>
      <div className="clock-date">
        {formatDate(currentTime)}
      </div>
      <div className="clock-glow"></div>

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

export default ClockWidget
