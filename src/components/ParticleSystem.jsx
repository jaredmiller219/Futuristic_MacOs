import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './ParticleSystem.css'

const ParticleSystem = () => {
  const [particles, setParticles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    // Create initial particles (reduced for performance)
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: getRandomColor(),
      life: Math.random() * 100 + 50
    }))
    setParticles(initialParticles)

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animationLoop = () => {
      setParticles(prev => prev.map(particle => {
        // Calculate distance from mouse
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Mouse attraction/repulsion
        let newSpeedX = particle.speedX
        let newSpeedY = particle.speedY
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          newSpeedX += (dx / distance) * force * 0.01
          newSpeedY += (dy / distance) * force * 0.01
        }

        // Update position
        let newX = particle.x + newSpeedX
        let newY = particle.y + newSpeedY

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          newSpeedX *= -0.8
          newX = Math.max(0, Math.min(window.innerWidth, newX))
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          newSpeedY *= -0.8
          newY = Math.max(0, Math.min(window.innerHeight, newY))
        }

        // Fade over time
        const newLife = particle.life - 0.5
        const newOpacity = newLife > 0 ? (newLife / 100) * 0.5 : 0

        return {
          ...particle,
          x: newX,
          y: newY,
          speedX: newSpeedX * 0.99, // Friction
          speedY: newSpeedY * 0.99,
          life: newLife > 0 ? newLife : Math.random() * 100 + 50,
          opacity: newLife > 0 ? newOpacity : Math.random() * 0.5 + 0.1,
          color: newLife <= 0 ? getRandomColor() : particle.color
        }
      }))
    }

    const interval = setInterval(animationLoop, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [mousePosition])

  const getRandomColor = () => {
    const colors = [
      '#007aff', '#af52de', '#ff2d92', '#ff9500', '#30d158', '#ff453a'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div ref={containerRef} className="particle-system">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="particle-dot"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Mouse cursor glow */}
      <motion.div
        className="cursor-glow"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default ParticleSystem
