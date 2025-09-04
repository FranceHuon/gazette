import { Heading, HeadingProps } from '@chakra-ui/react'

export interface TitleProps extends HeadingProps {
  fontColor: string
  text: string
}

function Title({ fontColor, text, ...props }: TitleProps) {
  return (
    <Heading
      fontFamily="Staatliches"
      color={fontColor}
      fontSize={{ base: '4xl', md: '7xl' }}
      transition="all 0.3s ease"
      {...props}
    >
      {text}
    </Heading>
  )
}

export default Title
