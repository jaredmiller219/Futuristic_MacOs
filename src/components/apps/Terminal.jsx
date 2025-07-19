import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Terminal.css'

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to FuturisticOS Terminal v2.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  clear    - Clear the terminal',
      '  ls       - List directory contents',
      '  pwd      - Print working directory',
      '  whoami   - Display current user',
      '  date     - Show current date and time',
      '  neofetch - Display system information',
      '  matrix   - Enter the matrix...',
      '  hack     - Initiate hacking sequence',
      ''
    ],
    clear: () => {
      setHistory([])
      return []
    },
    ls: () => [
      'Applications/',
      'Desktop/',
      'Documents/',
      'Downloads/',
      'Pictures/',
      'Music/',
      'Videos/',
      'futuristic_project.zip',
      'readme.txt',
      ''
    ],
    pwd: () => ['/Users/futuristic-user', ''],
    whoami: () => ['futuristic-user', ''],
    date: () => [new Date().toString(), ''],
    neofetch: () => [
      '                    ████████',
      '                ████████████████',
      '              ██████████████████',
      '            ████████████████████',
      '          ██████████████████████',
      '        ████████████████████████',
      '      ██████████████████████████',
      '    ████████████████████████████',
      '  ██████████████████████████████',
      '████████████████████████████████',
      '',
      'OS: FuturisticOS 2.0',
      'Kernel: Darwin 23.0.0',
      'Shell: zsh 5.9',
      'CPU: Apple M3 Pro (12) @ 4.05GHz',
      'Memory: 18432MiB',
      'GPU: Apple M3 Pro',
      ''
    ],
    matrix: () => {
      const chars = '01'
      const lines = []
      for (let i = 0; i < 10; i++) {
        let line = ''
        for (let j = 0; j < 50; j++) {
          line += chars[Math.floor(Math.random() * chars.length)]
        }
        lines.push(line)
      }
      lines.push('')
      return lines
    },
    hack: () => [
      'Initializing hacking sequence...',
      'Connecting to mainframe...',
      'Bypassing firewall...',
      'Accessing encrypted files...',
      'Download complete: secret_files.zip',
      'Connection terminated.',
      ''
    ]
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    const command = currentInput.trim().toLowerCase()
    const newHistory = [
      ...history,
      { type: 'input', content: `$ ${currentInput}` }
    ]

    setHistory(newHistory)
    setCurrentInput('')
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 300))

    if (commands[command]) {
      const output = commands[command]()
      setHistory(prev => [
        ...prev,
        ...output.map(line => ({ type: 'output', content: line }))
      ])
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${command}` },
        { type: 'output', content: '' }
      ])
    }

    setIsTyping(false)
  }

  const getPrompt = () => {
    return 'futuristic-user@FuturisticOS ~ %'
  }

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header glass-subtle">
        <div className="terminal-title">Terminal</div>
        <div className="terminal-controls">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        {history.map((line, index) => (
          <motion.div
            key={index}
            className={`terminal-line ${line.type}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {line.content}
          </motion.div>
        ))}
        
        {isTyping && (
          <div className="terminal-line typing">
            <span className="typing-indicator">...</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="terminal-line input">
            <span className="prompt">{getPrompt()}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="terminal-input"
              autoFocus
              spellCheck={false}
            />
            <span className="cursor">█</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal
