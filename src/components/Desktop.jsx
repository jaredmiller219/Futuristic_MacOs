import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ClockWidget from './widgets/ClockWidget'
import WeatherWidget from './widgets/WeatherWidget'
import SystemStatsWidget from './widgets/SystemStatsWidget'
import ContextMenu from './ContextMenu'
import './Desktop.css'

const Desktop = () => {
  const [particles, setParticles] = useState([])
  const [contextMenu, setContextMenu] = useState(null)

  useEffect(() => {
    // Create floating particles for ambiance
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1
    }))
    setParticles(newParticles)
  }, [])

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleContextAction = (action) => {
    console.log('Context action:', action)
    // Handle different context menu actions
    switch (action) {
      case 'new-folder':
        console.log('Creating new folder...')
        break
      case 'refresh':
        window.location.reload()
        break
      case 'about':
        alert('FuturisticOS v2.0 - The future of desktop computing!')
        break
      default:
        console.log('Action not implemented:', action)
    }
  }

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      {/* Animated Background */}
      <div className="desktop-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity
            }}
            animate={{
              y: [particle.y, particle.y - 100, particle.y],
              x: [particle.x, particle.x + 50, particle.x]
            }}
            transition={{
              duration: 10 + particle.speed * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Desktop Widgets */}
      <div className="desktop-widgets">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="widget-container"
          style={{ top: '100px', right: '50px' }}
        >
          <ClockWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="widget-container"
          style={{ top: '280px', right: '50px' }}
        >
          <WeatherWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="widget-container"
          style={{ bottom: '150px', left: '50px' }}
        >
          <SystemStatsWidget />
        </motion.div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextAction}
        />
      )}
    </div>
  )
}

export default Desktop
