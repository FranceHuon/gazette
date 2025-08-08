'use client'

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface ResponsiveLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
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
    <Flex
      width="100%"
      minHeight="100%"
      flexGrow={1}
      backgroundColor="lightGray"
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
    </Flex>
  )
}
