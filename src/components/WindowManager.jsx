import { motion } from 'framer-motion'
import Draggable from 'react-draggable'
import { X, Minus, Square } from 'lucide-react'
import './WindowManager.css'

const WindowManager = ({ windows, onClose, onMinimize, onFocus, setWindows }) => {
  const handleDrag = (windowId, e, data) => {
    setWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, x: data.x, y: data.y }
        : window
    ))
  }

  const handleResize = (windowId, newWidth, newHeight) => {
    setWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, width: newWidth, height: newHeight }
        : window
    ))
  }

  return (
    <div className="window-manager">
      {windows.map(window => (
        !window.isMinimized && (
          <Draggable
            key={window.id}
            handle=".window-header"
            position={{ x: window.x, y: window.y }}
            onDrag={(e, data) => handleDrag(window.id, e, data)}
            bounds="parent"
          >
            <motion.div
              className="window glass-strong"
              style={{
                width: window.width,
                height: window.height,
                zIndex: window.zIndex
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => onFocus(window.id)}
            >
              {/* Window Header */}
              <div className="window-header">
                <div className="window-controls">
                  <button 
                    className="window-control close"
                    onClick={() => onClose(window.id)}
                  >
                    <X size={12} />
                  </button>
                  <button 
                    className="window-control minimize"
                    onClick={() => onMinimize(window.id)}
                  >
                    <Minus size={12} />
                  </button>
                  <button className="window-control maximize">
                    <Square size={10} />
                  </button>
                </div>
                
                <div className="window-title">
                  {window.title}
                </div>
                
                <div className="window-spacer"></div>
              </div>

              {/* Window Content */}
              <div className="window-content">
                {window.content}
              </div>

              {/* Resize Handle */}
              <div 
                className="resize-handle"
                onMouseDown={(e) => {
                  e.preventDefault()
                  const startX = e.clientX
                  const startY = e.clientY
                  const startWidth = window.width
                  const startHeight = window.height

                  const handleMouseMove = (e) => {
                    const newWidth = Math.max(300, startWidth + (e.clientX - startX))
                    const newHeight = Math.max(200, startHeight + (e.clientY - startY))
                    handleResize(window.id, newWidth, newHeight)
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }

                  document.addEventListener('mousemove', handleMouseMove)
                  document.addEventListener('mouseup', handleMouseUp)
                }}
              />
            </motion.div>
          </Draggable>
        )
      ))}
    </div>
  )
}

export default WindowManager
