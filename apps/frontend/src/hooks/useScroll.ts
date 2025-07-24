'use client'

import { useEffect, useState } from 'react'

interface UseScrollOptions {
  threshold?: number
}

export function useScroll({ threshold = 100 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > threshold)
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { isScrolled }
}
