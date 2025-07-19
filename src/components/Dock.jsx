import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Folder,
  Terminal,
  Settings,
  Camera,
  Music,
  Mail,
  Calendar,
  Calculator,
  Globe
} from 'lucide-react'
import FileManager from './apps/FileManager'
import TerminalApp from './apps/Terminal'
import './Dock.css'

const Dock = ({ onOpenApp }) => {
  const [hoveredApp, setHoveredApp] = useState(null)

  const apps = [
    { id: 'finder', name: 'Finder', icon: Folder, color: '#007aff' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#000000' },
    { id: 'settings', name: 'System Preferences', icon: Settings, color: '#8e8e93' },
    { id: 'camera', name: 'Camera', icon: Camera, color: '#34c759' },
    { id: 'music', name: 'Music', icon: Music, color: '#ff2d92' },
    { id: 'mail', name: 'Mail', icon: Mail, color: '#007aff' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: '#ff3b30' },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: '#ff9500' },
    { id: 'browser', name: 'Safari', icon: Globe, color: '#007aff' }
  ]

  const handleAppClick = (app) => {
    const content = getAppContent(app.id)
    onOpenApp(app.id, app.name, content)
  }

  const getAppContent = (appId) => {
    switch (appId) {
      case 'finder':
        return <FileManager />
      case 'terminal':
        return <TerminalApp />
      case 'settings':
        return <div className="app-content">
          <h2>System Preferences</h2>
          <p>Configure your futuristic experience...</p>
          <div className="settings-grid">
            <div className="setting-item glass">
              <h3>Display</h3>
              <p>Adjust resolution and color</p>
            </div>
            <div className="setting-item glass">
              <h3>Sound</h3>
              <p>Audio preferences</p>
            </div>
            <div className="setting-item glass">
              <h3>Network</h3>
              <p>Wi-Fi and connectivity</p>
            </div>
            <div className="setting-item glass">
              <h3>Security</h3>
              <p>Privacy and protection</p>
            </div>
          </div>
        </div>
      default:
        return <div className="app-content">
          <h2>{apps.find(a => a.id === appId)?.name}</h2>
          <p>Coming soon in FuturisticOS...</p>
          <div className="coming-soon-animation">
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
          </div>
        </div>
    }
  }

  return (
    <motion.div 
      className="dock glass"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="dock-apps">
        {apps.map((app, index) => {
          const Icon = app.icon
          const isHovered = hoveredApp === app.id
          const scale = isHovered ? 1.3 : 1
          
          return (
            <motion.div
              key={app.id}
              className="dock-app"
              whileHover={{ scale: 1.2, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredApp(app.id)}
              onHoverEnd={() => setHoveredApp(null)}
              onClick={() => handleAppClick(app)}
              style={{
                zIndex: isHovered ? 10 : 1
              }}
            >
              <div 
                className="app-icon glass-strong"
                style={{ 
                  backgroundColor: `${app.color}20`,
                  borderColor: `${app.color}40`
                }}
              >
                <Icon 
                  size={24} 
                  color={app.color}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
                />
              </div>
              
              {isHovered && (
                <motion.div
                  className="app-tooltip glass"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {app.name}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Dock
