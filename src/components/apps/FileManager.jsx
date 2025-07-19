import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Folder, 
  File, 
  Image, 
  Music, 
  Video, 
  Archive,
  ChevronRight,
  Home,
  HardDrive,
  Cloud
} from 'lucide-react'
import './FileManager.css'

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState(['Home', 'Documents'])
  const [selectedItems, setSelectedItems] = useState([])

  const mockFiles = [
    { name: 'Projects', type: 'folder', size: null, modified: '2024-01-15' },
    { name: 'Photos', type: 'folder', size: null, modified: '2024-01-14' },
    { name: 'Music', type: 'folder', size: null, modified: '2024-01-13' },
    { name: 'presentation.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-12' },
    { name: 'vacation.jpg', type: 'image', size: '5.2 MB', modified: '2024-01-11' },
    { name: 'song.mp3', type: 'audio', size: '4.1 MB', modified: '2024-01-10' },
    { name: 'video.mp4', type: 'video', size: '125 MB', modified: '2024-01-09' },
    { name: 'archive.zip', type: 'archive', size: '15.3 MB', modified: '2024-01-08' }
  ]

  const getFileIcon = (type) => {
    switch (type) {
      case 'folder':
        return <Folder size={20} color="#007aff" />
      case 'image':
        return <Image size={20} color="#ff2d92" />
      case 'audio':
        return <Music size={20} color="#af52de" />
      case 'video':
        return <Video size={20} color="#ff9500" />
      case 'archive':
        return <Archive size={20} color="#30d158" />
      default:
        return <File size={20} color="#8e8e93" />
    }
  }

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.name])
    }
  }

  const handlePathClick = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  return (
    <div className="file-manager">
      {/* Sidebar */}
      <div className="file-sidebar glass-subtle">
        <div className="sidebar-section">
          <div className="sidebar-title">Favorites</div>
          <div className="sidebar-item">
            <Home size={16} />
            <span>Home</span>
          </div>
          <div className="sidebar-item">
            <HardDrive size={16} />
            <span>Applications</span>
          </div>
          <div className="sidebar-item">
            <Cloud size={16} />
            <span>iCloud Drive</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="file-content">
        {/* Breadcrumb */}
        <div className="breadcrumb glass-subtle">
          {currentPath.map((path, index) => (
            <div key={index} className="breadcrumb-item">
              <span 
                onClick={() => handlePathClick(index)}
                className="breadcrumb-link"
              >
                {path}
              </span>
              {index < currentPath.length - 1 && <ChevronRight size={14} />}
            </div>
          ))}
        </div>

        {/* File Grid */}
        <div className="file-grid">
          {mockFiles.map((file, index) => (
            <motion.div
              key={file.name}
              className="file-item glass hover-lift"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleItemClick(file)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="file-icon">
                {getFileIcon(file.type)}
              </div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-details">
                  {file.size && <span>{file.size}</span>}
                  <span>{file.modified}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FileManager
