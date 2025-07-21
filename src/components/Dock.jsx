import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Folder,
  Terminal,
  Settings,
  Camera,
  Music,
  Mail,
  Calendar,
  Calculator,
  Globe,
  FileText
} from 'lucide-react'
import FileManager from './apps/FileManager'
import TerminalApp from './apps/Terminal'
import Notes from './apps/Notes'
import './Dock.css'

const Dock = ({ onOpenApp }) => {
  const [hoveredApp, setHoveredApp] = useState(null)
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, app: null })

  const apps = [
    { id: 'finder', name: 'Finder', icon: Folder, color: '#007aff' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#000000' },
    { id: 'notes', name: 'Notes', icon: FileText, color: '#ff9500' },
    { id: 'settings', name: 'System Preferences', icon: Settings, color: '#8e8e93' },
    { id: 'camera', name: 'Camera', icon: Camera, color: '#34c759' },
    { id: 'music', name: 'Music', icon: Music, color: '#ff2d92' },
    { id: 'mail', name: 'Mail', icon: Mail, color: '#007aff' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: '#ff3b30' },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: '#ff9500' },
    { id: 'browser', name: 'Safari', icon: Globe, color: '#007aff' }
  ]

  const handleAppClick = (app) => {
    onOpenApp(app.id, app.name)
  }

  const handleContextMenu = (event, app) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, app });
  }

  // Hide context menu on click elsewhere
  useEffect(() => {
    const hideMenu = () => setContextMenu({ visible: false, x: 0, y: 0, app: null });
    if (contextMenu.visible) {
      window.addEventListener('click', hideMenu);
      return () => window.removeEventListener('click', hideMenu);
    }
  }, [contextMenu.visible]);

  const getAppContent = (appId) => {
    switch (appId) {
      case 'finder':
        return <FileManager />
      case 'terminal':
        return <TerminalApp />
      case 'notes':
        return <Notes />
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
              onClick={(e) => {
                // Option+Click opens context menu, not app
                if (e.altKey) {
                  handleContextMenu(e, app);
                } else {
                  handleAppClick(app);
                }
              }}
              onContextMenu={(e) => handleContextMenu(e, app)}
              onMouseDown={(e) => {
                // Option+Click (Alt+Click) when hovered should only open context menu
                if (isHovered && e.altKey && e.button === 0) {
                  handleContextMenu(e, app);
                }
              }}
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
      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="dock-context-menu glass"
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 9999,
            background: 'rgba(30,30,30,0.95)',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            padding: '8px 0',
            minWidth: '140px'
          }}
        >
          <div style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => { onOpenApp(contextMenu.app.id, contextMenu.app.name); setContextMenu({ visible: false, x: 0, y: 0, app: null }); }}>Open</div>
          <div style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => { /* Add close logic if needed */ setContextMenu({ visible: false, x: 0, y: 0, app: null }); }}>Close</div>
          <div style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => { setContextMenu({ visible: false, x: 0, y: 0, app: null }); }}>Info</div>
        </div>
      )}
    </motion.div>
  )
}

export default Dock
