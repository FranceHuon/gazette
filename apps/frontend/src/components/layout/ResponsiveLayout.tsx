'use client'

import { Box } from '@chakra-ui/react'
import React from 'react'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  maxWidth?: string
  padding?: object
  centered?: boolean
}

export function ResponsiveLayout({
  children,
  maxWidth,
  padding,
  centered = true,
}: ResponsiveLayoutProps) {
  const defaultPadding = {
    base: 4,
    md: 6,
    lg: 8,
  }

  return (
    <Box
      width="100%"
      height="100%"
      overflow="auto"
      backgroundColor="color.lightGray"
    >
      <Box
        px={padding || defaultPadding}
        py={padding || defaultPadding}
        maxWidth={maxWidth || 'none'}
        margin={centered ? '0 auto' : '0'}
        width="100%"
      >
        {children}
      </Box>
    </Box>
  )
}
