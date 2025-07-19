import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import ClockWidget from './components/widgets/ClockWidget'
import WeatherWidget from './components/widgets/WeatherWidget'
import NotificationSystem, { useNotifications } from './components/NotificationSystem'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

// Simple Window Component
const SimpleWindow = ({ window, onClose, onFocus }) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: window.innerWidth - window.width, top: 32, bottom: window.innerHeight - window.height }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.02, zIndex: 1000 }}
      style={{
        position: 'absolute',
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: window.zIndex,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onClick={() => onFocus(window.id)}
    >
      {/* Window Header */}
      <div style={{
        height: '40px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            title="Close"
          />
          <div
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer' }}
            title="Minimize"
          />
          <div
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f', cursor: 'pointer' }}
            title="Maximize"
          />
        </div>
        <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
          {window.title}
        </div>
        <div style={{ width: '60px' }} />
      </div>

      {/* Window Content */}
      <div style={{
        padding: '20px',
        color: 'white',
        height: 'calc(100% - 40px)',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '16px' }}>{window.title}</h2>
        <p>Welcome to {window.title}!</p>
        <p style={{ marginTop: '16px', opacity: 0.7 }}>
          This is a demo window. In a full implementation, this would contain the actual application content.
        </p>
      </div>
    </motion.div>
  )
}

// Simple Desktop Component (inline)
const SimpleDesktop = ({ currentTime }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '32px',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Animated orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite'
      }} />

      <div style={{
        position: 'absolute',
        top: '60%',
        right: '20%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(175, 82, 222, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '-3s'
      }} />

      {/* Desktop Widgets */}
      <ClockWidget />
      <WeatherWidget />


    </div>
  )
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [windows, setWindows] = useState([])
  const { notifications, addNotification, removeNotification } = useNotifications()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 't':
            e.preventDefault()
            openWindow('terminal', 'Terminal')
            break
          case 'f':
            e.preventDefault()
            openWindow('finder', 'Finder')
            break
          case ',':
            e.preventDefault()
            openWindow('settings', 'System Preferences')
            break
          case 'r':
            e.preventDefault()
            // Refresh shortcut disabled for offline app
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openWindow = (appId, title) => {
    const newWindow = {
      id: Date.now(),
      appId,
      title,
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100,
      width: 600,
      height: 400,
      zIndex: windows.length + 1
    }
    setWindows(prev => [...prev, newWindow])

    addNotification({
      title: `Opening ${title}`,
      message: 'Application launched successfully!',
      type: 'success'
    })
  }

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(window => window.id !== id))
  }

  const focusWindow = (id) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex), 0)
    setWindows(prev => prev.map(window =>
      window.id === id ? { ...window, zIndex: maxZ + 1 } : window
    ))
  }



  return (
    <div className="app">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <MenuBar currentTime={currentTime} />
          <SimpleDesktop currentTime={currentTime} />

          {/* Windows */}
          {windows.map(window => (
            <SimpleWindow
              key={window.id}
              window={window}
              onClose={closeWindow}
              onFocus={focusWindow}
            />
          ))}

          <Dock onOpenApp={openWindow} />

          <NotificationSystem
            notifications={notifications}
            onRemove={removeNotification}
          />
        </>
      )}
    </div>
  )
}

export default App
