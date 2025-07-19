import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const loadingSteps = [
    'Initializing quantum processors...',
    'Loading holographic interface...',
    'Calibrating neural networks...',
    'Synchronizing with the matrix...',
    'Activating glassmorphism engine...',
    'Finalizing futuristic experience...'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 1000)
          return 100
        }
        
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Effects */}
          <div className="loading-background">
            <div className="loading-orb orb-1"></div>
            <div className="loading-orb orb-2"></div>
            <div className="loading-orb orb-3"></div>
          </div>

          {/* Main Loading Content */}
          <div className="loading-content">
            {/* Logo */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="logo-ring">
                <div className="logo-inner">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#007aff" />
                        <stop offset="100%" stopColor="#af52de" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="loading-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              FuturisticOS
            </motion.h1>

            {/* Progress Bar */}
            <motion.div
              className="progress-container"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="progress-glow" style={{ left: `${progress}%` }} />
              </div>
              <div className="progress-text">{Math.round(progress)}%</div>
            </motion.div>

            {/* Loading Step */}
            <motion.div
              className="loading-step"
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingSteps[currentStep]}
            </motion.div>

            {/* Scanning Lines */}
            <div className="scanning-lines">
              <div className="scan-line"></div>
              <div className="scan-line"></div>
              <div className="scan-line"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
