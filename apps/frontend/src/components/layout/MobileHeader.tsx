'use client'

import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { Bell } from 'lucide-react'

interface MobileHeaderProps {
  currentPage: string
  showNotifications?: boolean
}

function MobileHeader({ currentPage, showNotifications = true }: MobileHeaderProps) {
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={20}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      px={4}
      py={3}
      boxShadow="0 2px 8px rgba(0,0,0,0.05)"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={3}>
          <Box
            width="40px"
            height="40px"
            bgColor="chaletGreen"
            borderRadius="12px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
            fontSize="xl"
            fontFamily="Staatliches"
          >
            G
          </Box>
          <Heading size="lg" color="chaletGreen">
            {currentPage}
          </Heading>
        </Flex>

        {/* Icône de notification optionnelle */}
        {showNotifications && (
          <IconButton
            variant="ghost"
            icon={<Bell size={20} />}
            size="sm"
            aria-label="Notifications"
            color="gray.500"
          />
        )}
      </Flex>
    </Box>
  )
}

export default MobileHeader
