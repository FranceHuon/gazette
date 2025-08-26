'use client'

import type { ButtonProps, InputProps } from '@chakra-ui/react'
import {
  InputGroup as ChakraInputGroup,
  IconButton,
  Input,
  InputRightElement,
  useControllableState,
} from '@chakra-ui/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { LuEye, LuEyeOff } from 'react-icons/lu'

const EyeIcon = () => React.createElement(LuEye as React.ComponentType)
const EyeOffIcon = () => React.createElement(LuEyeOff as React.ComponentType)

const DEFAULT_VISIBILITY_ICON = {
  on: <EyeIcon />,
  off: <EyeOffIcon />,
}

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.JSX.Element, off: React.JSX.Element }
}

export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: React.ComponentProps<typeof ChakraInputGroup>
}

function VisibilityTrigger({ ref, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { t } = useTranslation()
  return (
    <IconButton

      ref={ref}
      mr="-2"
      size="sm"
      variant="ghost"
      height="calc(100% - 8px)"
      aria-label={t('ui.togglePasswordVisibility')}
      {...props}
    />
  )
}

export function PasswordInput({ ref, ...props }: PasswordInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = DEFAULT_VISIBILITY_ICON,
    ...rest
  } = props

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible || false,
    onChange: onVisibleChange,
  })

  return (
    <ChakraInputGroup {...rootProps} maxWidth="100%">
      <Input
        {...rest}
        ref={ref}
        type={visible ? 'text' : 'password'}
        border="1px solid"
        borderColor="lightGray"
        boxShadow="none"
        padding="0.8rem"
        height="auto"
        rounded="md"
        minWidth={12}
      />
      <InputRightElement
        height="100%"
        display="flex"
        alignItems="center"
        px="1.5rem"
      >
        <VisibilityTrigger
          isDisabled={rest.isDisabled}
          onClick={() => {
            if (rest.isDisabled)
              return
            setVisible(!visible)
          }}
        >
          {visible ? visibilityIcon.off : visibilityIcon.on}
        </VisibilityTrigger>
      </InputRightElement>
    </ChakraInputGroup>
  )
}
