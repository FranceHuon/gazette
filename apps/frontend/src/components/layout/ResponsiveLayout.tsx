'use client'

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface ResponsiveLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
  maxWidth?: string
  padding?: object
  centered?: boolean
  backgroundColor?: string
}

export function ResponsiveLayout({
  children,
  maxWidth,
  padding,
  centered = true,
  backgroundColor,
}: ResponsiveLayoutProps) {
  const defaultPadding = {
    base: 4,
    md: 6,
    lg: 8,
  }

  return (
    <Flex
      width="100%"
      minHeight="100%"
      flexGrow={1}
    >
      <Box
        px={padding || defaultPadding}
        py={padding || defaultPadding}
        maxWidth={maxWidth || 'none'}
        margin={centered ? '0 auto' : '0'}
        width="100%"
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    </Flex>
  )
}
