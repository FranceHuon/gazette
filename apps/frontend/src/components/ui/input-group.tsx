import type { BoxProps } from '@chakra-ui/react'
import { InputGroup as ChakraInputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import * as React from 'react'

export interface InputGroupProps extends BoxProps {
  startElement?: React.JSX.Element
  endElement?: React.JSX.Element
  children: React.JSX.Element
}

export function InputGroup({ ref, ...props }: InputGroupProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const {
    startElement,
    endElement,
    children,
    ...rest
  } = props

  const childProps = {
    ...(startElement && { pl: '10' }),
    ...(endElement && { pr: '10' }),
    ...children.props,
  }

  return (
    <ChakraInputGroup ref={ref} {...rest}>
      {startElement && (
        <InputLeftElement pointerEvents="none">
          {startElement}
        </InputLeftElement>
      )}
      {React.cloneElement(children, childProps)}
      {endElement && (
        <InputRightElement>
          {endElement}
        </InputRightElement>
      )}
    </ChakraInputGroup>
  )
}
