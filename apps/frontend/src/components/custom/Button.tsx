import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { Button as ChakraButton, Text } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
  text: string
  height?: string
  width?: string
  fontSize?: string
  capitalizeText?: boolean
}

function Button({
  text,
  capitalizeText,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      color="white"
      bgColor="chaletGreen"
      shadow="sm"
      borderRadius="18px"
      px={6}
      {...props}
    >
      <Text textTransform={capitalizeText ? 'capitalize' : 'uppercase'}>
        {text}
      </Text>
    </ChakraButton>
  )
}

export default Button
