import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { Button as ChakraButton, Text } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
  fontColor: string
  backgroundColor: string
  text: string
  height?: string
  width?: string
  fontSize?: string
  capitalizeText?: boolean // Conditionnal prop to handle text's style
}

function Button({
  fontColor,
  backgroundColor,
  text,
  capitalizeText,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      color={fontColor}
      bgColor={backgroundColor}
      shadow="sm"
      borderRadius="20px"
      margin="3"
      {...props} // all the other props of chakra ui are transmetted here
    >
      <Text textTransform={capitalizeText ? 'capitalize' : 'uppercase'}>
        {/* if capitalizetext is true, text transform become capitalize (only the first letter uppercase)
                    otherwise if capitalizetext is false, text transform stay uppercase */}
        {text}
      </Text>
    </ChakraButton>
  )
}

export default Button
