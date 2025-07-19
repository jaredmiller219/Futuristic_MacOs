import { useEffect } from 'react'

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, metaKey, ctrlKey, altKey, shiftKey } = event
      
      // Create a key combination string
      const modifiers = []
      if (metaKey || ctrlKey) modifiers.push('cmd')
      if (altKey) modifiers.push('alt')
      if (shiftKey) modifiers.push('shift')
      
      const combination = [...modifiers, key.toLowerCase()].join('+')
      
      // Check if this combination has a handler
      if (shortcuts[combination]) {
        event.preventDefault()
        shortcuts[combination](event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}

export default useKeyboardShortcuts
