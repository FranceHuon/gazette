'use client'

import { useCallback, useEffect, useRef } from 'react'

interface UseKeyboardNavigationOptions {
  enableArrowKeys?: boolean
  enableEscapeKey?: boolean
  trapFocus?: boolean
  onEscape?: () => void
}

export function useKeyboardNavigation(options: UseKeyboardNavigationOptions = {}) {
  const {
    enableArrowKeys = true,
    enableEscapeKey = true,
    trapFocus = false,
    onEscape,
  } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const focusableElementsRef = useRef<HTMLElement[]>([])

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const selectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    return Array.from(container.querySelectorAll(selectors)).filter(
      (element) => {
        const htmlElement = element as HTMLElement
        return (
          htmlElement.offsetWidth > 0
          && htmlElement.offsetHeight > 0
          && !htmlElement.hasAttribute('hidden')
          && getComputedStyle(htmlElement).visibility !== 'hidden'
        )
      },
    ) as HTMLElement[]
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current)
      return

    const focusableElements = getFocusableElements(containerRef.current)
    focusableElementsRef.current = focusableElements

    const currentFocusIndex = focusableElements.findIndex(
      element => element === document.activeElement,
    )

    // Gestion de la touche Échap
    if (enableEscapeKey && event.key === 'Escape') {
      event.preventDefault()
      if (onEscape) {
        onEscape()
      }
      else {
        // Retourner au premier élément focusable
        focusableElements[0]?.focus()
      }
      return
    }

    // Navigation avec les flèches
    if (enableArrowKeys && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault()

      if (focusableElements.length === 0)
        return

      let nextIndex = 0

      if (currentFocusIndex !== -1) {
        nextIndex = event.key === 'ArrowDown'
          ? (currentFocusIndex + 1) % focusableElements.length
          : (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length
      }

      focusableElements[nextIndex]?.focus()
    }

    // Piégeage du focus avec Tab
    if (trapFocus && event.key === 'Tab') {
      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      if (event.shiftKey) {
        // Shift + Tab (navigation vers l'arrière)
        if (currentFocusIndex <= 0) {
          event.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
        }
      }
      else {
        // Tab simple (navigation vers l'avant)
        if (currentFocusIndex >= focusableElements.length - 1) {
          event.preventDefault()
          focusableElements[0]?.focus()
        }
      }
    }
  }, [enableArrowKeys, enableEscapeKey, trapFocus, onEscape])

  useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.addEventListener('keydown', handleKeyDown)

    // Auto-focus sur le premier élément focusable lors du montage
    const focusableElements = getFocusableElements(container)
    if (focusableElements.length > 0 && (!document.activeElement
      || !container.contains(document.activeElement as Node))) {
      focusableElements[0]?.focus()
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    containerRef,
    focusableElements: focusableElementsRef.current,
  }
}

export default useKeyboardNavigation
