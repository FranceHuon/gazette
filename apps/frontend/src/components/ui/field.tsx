import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import * as React from 'react'

export interface FieldProps {
  label?: string | React.JSX.Element
  helperText?: string | React.JSX.Element
  errorText?: string | React.JSX.Element
  isRequired?: boolean
  isInvalid?: boolean
  children?: React.JSX.Element | React.JSX.Element[]
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (props, ref) => {
    const { label, children, helperText, errorText, isRequired, isInvalid, ...rest } = props
    return (
      <FormControl
        isRequired={isRequired}
        isInvalid={isInvalid ? true : undefined}
        ref={ref}
        {...rest}
      >
        {label && <FormLabel fontSize="0.8rem" textTransform="uppercase" fontWeight="bold">{label}</FormLabel>}
        {children}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
      </FormControl>
    )
  },
)
