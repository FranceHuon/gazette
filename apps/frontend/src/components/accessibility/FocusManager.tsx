'use client'

import { useEffect, useRef } from 'react'

interface FocusManagerProps {
  children: React.ReactNode
  autoFocus?: boolean
  restoreFocus?: boolean
  trapFocus?: boolean
}

function FocusManager({
  children,
  autoFocus = false,
  restoreFocus = false,
  trapFocus = false,
}: FocusManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container)
      return

    // Sauvegarder l'élément actif précédent
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement as HTMLElement
    }

    // Auto-focus sur le premier élément focusable
    if (autoFocus) {
      const focusableElements = container.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex="-1"])',
      )
      const firstFocusable = focusableElements[0] as HTMLElement
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }

    // Gestion du piégeage du focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!trapFocus || e.key !== 'Tab')
        return

      const focusableElements = Array.from(
        container.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[]

      if (focusableElements.length === 0)
        return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      }
      else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    if (trapFocus) {
      container.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (trapFocus) {
        container.removeEventListener('keydown', handleKeyDown)
      }

      // Restaurer le focus précédent
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [autoFocus, restoreFocus, trapFocus])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

export default FocusManager
