'use client'

import { Link } from '@chakra-ui/react'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <Link
      href={href}
      className="skip-link"
      position="absolute"
      top="-40px"
      left="6px"
      bg="chaletGreen"
      color="white"
      p="8px"
      textDecoration="none"
      borderRadius="4px"
      fontWeight="bold"
      zIndex={100}
      transition="top 0.3s"
      _focus={{
        top: '6px',
      }}
      onClick={(e) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.focus()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      {children}
    </Link>
  )
}

export default SkipLink
