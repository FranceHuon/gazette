'use client'

import { useEffect, useState } from 'react'

/**
 * Hook pour détecter si l'utilisateur navigue au clavier
 * et appliquer les styles de focus appropriés uniquement dans ce cas
 */
export function useKeyboardDetection() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    let keyboardThrottleTimeout: NodeJS.Timeout

    const handleKeyDown = (e: KeyboardEvent) => {
      // Détecter les touches de navigation
      if (
        e.key === 'Tab'
        || e.key === 'ArrowUp'
        || e.key === 'ArrowDown'
        || e.key === 'ArrowLeft'
        || e.key === 'ArrowRight'
        || e.key === 'Enter'
        || e.key === ' '
        || e.key === 'Escape'
      ) {
        setIsKeyboardUser(true)
        document.documentElement.classList.add('keyboard-user')

        // Réinitialiser après 2 secondes d'inactivité
        clearTimeout(keyboardThrottleTimeout)
        keyboardThrottleTimeout = setTimeout(() => {
          setIsKeyboardUser(false)
          document.documentElement.classList.remove('keyboard-user')
        }, 2000)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
      document.documentElement.classList.remove('keyboard-user')
      clearTimeout(keyboardThrottleTimeout)
    }

    const handlePointerDown = (e: PointerEvent) => {
      // Ignorer les événements de touch qui peuvent être traduits en clavier
      if (e.pointerType === 'mouse') {
        setIsKeyboardUser(false)
        document.documentElement.classList.remove('keyboard-user')
        clearTimeout(keyboardThrottleTimeout)
      }
    }

    // Écouter les événements globaux
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      clearTimeout(keyboardThrottleTimeout)
      document.documentElement.classList.remove('keyboard-user')
    }
  }, [])

  return { isKeyboardUser }
}

export default useKeyboardDetection

