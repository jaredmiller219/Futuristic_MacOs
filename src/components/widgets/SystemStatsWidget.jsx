import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Zap } from 'lucide-react'
import './SystemStatsWidget.css'

const SystemStatsWidget = () => {
  const [stats, setStats] = useState({
    cpu: 45,
    memory: 62,
    battery: 87
  })

  useEffect(() => {
    // Simulate changing system stats
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        battery: Math.max(5, Math.min(100, prev.battery - 0.1))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const StatBar = ({ label, value, icon: Icon, color }) => (
    <div className="stat-item">
      <div className="stat-header">
        <Icon size={16} color={color} />
        <span className="stat-label">{label}</span>
        <span className="stat-value">{Math.round(value)}%</span>
      </div>
      <div className="stat-bar">
        <motion.div 
          className="stat-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )

  return (
    <motion.div 
      className="system-stats-widget glass hover-lift"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stats-title">System Stats</div>
      
      <div className="stats-container">
        <StatBar 
          label="CPU" 
          value={stats.cpu} 
          icon={Cpu} 
          color="#ff453a"
        />
        <StatBar 
          label="Memory" 
          value={stats.memory} 
          icon={HardDrive} 
          color="#30d158"
        />
        <StatBar 
          label="Battery" 
          value={stats.battery} 
          icon={Zap} 
          color="#007aff"
        />
      </div>
      
      <div className="stats-glow"></div>
    </motion.div>
  )
}

export default SystemStatsWidget
