'use client'

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionText?: string
  actionPath?: string
  onAction?: () => void
}

function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionPath,
  onAction,
}: EmptyStateProps) {
  const router = useRouter()

  const handleAction = () => {
    if (onAction) {
      onAction()
    }
    else if (actionPath) {
      router.push(actionPath)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={{ base: '40px', md: '60px', lg: '80px' }}
      px={{ base: '20px', md: '40px' }}
      minHeight="300px"
    >
      <VStack spacing={{ base: 4, md: 6 }} maxW="500px">
        {Icon && (
          <Box
            p={4}
            borderRadius="full"
            bg="gray.100"
            color="gray.400"
          >
            <Icon size={48} strokeWidth={1.5} />
          </Box>
        )}

        <Heading
          as="h3"
          size="lg"
          color="gray.700"
          fontWeight="semibold"
        >
          {title}
        </Heading>

        <Text
          color="gray.600"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight="1.6"
        >
          {description}
        </Text>

        {(actionText && (actionPath || onAction)) && (
          <Button
            colorScheme="green"
            bg="chaletGreen"
            color="white"
            size="lg"
            onClick={handleAction}
            mt={4}
            _hover={{
              bg: 'darkGreen',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease"
          >
            {actionText}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default EmptyState
