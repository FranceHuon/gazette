'use client'

import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface ResponsiveGridProps extends FlexProps {
  children: React.ReactNode
  gap?: {
    base?: string | number
    sm?: string | number
    md?: string | number
    lg?: string | number
    xl?: string | number
  }
  justify?: {
    base?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
  align?: {
    base?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

// Constantes pour les props par défaut
const DEFAULT_GAP = { base: 4, md: 6, lg: 8 }
const DEFAULT_JUSTIFY = { base: 'center', md: 'space-between' }
const DEFAULT_ALIGN = { base: 'stretch', md: 'stretch' }

export function ResponsiveGrid({
  children,
  gap = DEFAULT_GAP,
  justify = DEFAULT_JUSTIFY,
  align = DEFAULT_ALIGN,
  ...flexProps
}: ResponsiveGridProps) {
  return (
    <Flex
      flexWrap="wrap"
      gap={gap}
      justify={justify}
      align={align}
      {...flexProps}
    >
      {children}
    </Flex>
  )
}

// Composant spécialisé pour les cartes
export function CardGrid({
  children,
  ...props
}: ResponsiveGridProps) {
  return (
    <ResponsiveGrid
      gap={{ base: '16px', md: '24px', lg: '32px' }}
      justify={{ base: 'center', md: 'flex-start' }}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

// Composant pour les grilles de navigation
export function NavigationGrid({
  children,
  ...props
}: ResponsiveGridProps) {
  return (
    <ResponsiveGrid
      gap={{ base: '8px', md: '12px', lg: '16px' }}
      justify={{ base: 'space-around', md: 'space-around', lg: 'space-around' }}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}
