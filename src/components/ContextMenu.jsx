import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FolderPlus, 
  FileText, 
  Image, 
  Refresh, 
  Settings, 
  Info,
  Copy,
  Paste,
  Trash2
} from 'lucide-react'
import './ContextMenu.css'

const ContextMenu = ({ x, y, onClose, onAction }) => {
  const menuRef = useRef(null)

  const menuItems = [
    { id: 'new-folder', label: 'New Folder', icon: FolderPlus },
    { id: 'new-file', label: 'New File', icon: FileText },
    { id: 'new-image', label: 'New Image', icon: Image },
    { type: 'separator' },
    { id: 'copy', label: 'Copy', icon: Copy, shortcut: '⌘C' },
    { id: 'paste', label: 'Paste', icon: Paste, shortcut: '⌘V' },
    { type: 'separator' },
    { id: 'refresh', label: 'Refresh Desktop', icon: Refresh },
    { id: 'settings', label: 'Desktop Settings', icon: Settings },
    { type: 'separator' },
    { id: 'about', label: 'About FuturisticOS', icon: Info }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleItemClick = (item) => {
    if (item.type !== 'separator') {
      onAction(item.id)
      onClose()
    }
  }

  // Adjust position to keep menu on screen
  const adjustedX = Math.min(x, window.innerWidth - 200)
  const adjustedY = Math.min(y, window.innerHeight - 300)

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="context-menu glass-strong"
        style={{
          left: adjustedX,
          top: adjustedY
        }}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.15 }}
      >
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className="context-menu-separator" />
            )
          }

          const Icon = item.icon

          return (
            <motion.div
              key={item.id}
              className="context-menu-item"
              onClick={() => handleItemClick(item)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="menu-item-content">
                <Icon size={16} />
                <span className="menu-item-label">{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="menu-item-shortcut">{item.shortcut}</span>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

export default ContextMenu
