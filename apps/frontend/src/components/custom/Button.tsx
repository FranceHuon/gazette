import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { Button as ChakraButton, Text } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
  text: string
  capitalizeText?: boolean
}

function Button({
  text,
  capitalizeText,
  fontSize,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      color="white"
      bgColor="chaletGreen"
      shadow="sm"
      borderRadius={{ base: '10px', md: '18px' }}
      height={{ base: '40px', md: '50px' }}
      width={{ base: '100px', md: '150px' }}
      px={{ base: 2, md: 6 }}
      _disabled={{
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: '0 6px 16px rgba(96, 108, 56, 0.4)',
      }}
      {...props}
    >
      <Text
        textTransform={capitalizeText ? 'capitalize' : 'uppercase'}
        fontSize={fontSize || { base: '11px', md: '16px' }}
      >
        {text}
      </Text>
    </ChakraButton>
  )
}

export default Button
