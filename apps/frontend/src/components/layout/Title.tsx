import { Heading, HeadingProps } from '@chakra-ui/react'

export interface TitleProps extends HeadingProps {
  fontColor: string
  text: string
}

function Title({ fontColor, text, ...props }: TitleProps) {
  return (
    <Heading
      fontFamily={{
        base: 'Poppins',
        lg: 'Staatliches',
      }}
      color={fontColor}
      fontSize="6rem"
      transition="all 0.3s ease"
      {...props}
    >
      {text}
    </Heading>
  )
}

export default Title
