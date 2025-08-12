'use client'

import type { BoxProps, ButtonProps, InputProps } from '@chakra-ui/react'
import {
  Box,
  InputGroup as ChakraInputGroup,
  HStack,
  IconButton,
  Input,
  InputRightElement,
  Stack,
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
  rootProps?: BoxProps
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

interface PasswordStrengthMeterProps extends BoxProps {
  max?: number
  value: number
}

export function PasswordStrengthMeter({ ref, ...props }: PasswordStrengthMeterProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const { max = 4, value, ...rest } = props

  const percent = (value / max) * 100
  const { label, color } = getColor(percent)

  const strengthBars = React.useMemo(() => {
    return Array.from({ length: max }).map((_, i) => ({
      id: `strength-bar-${i + 1}`,
      isActive: i < value,
    }))
  }, [max, value])

  return (
    <Stack align="flex-end" spacing="1" ref={ref} {...rest}>
      <HStack width="full">
        {strengthBars.map(({ id, isActive }) => (
          <Box
            key={id}
            height="1"
            flex="1"
            rounded="sm"
            bg={isActive ? color : 'gray.200'}
          />
        ))}
      </HStack>
      {label && <HStack fontSize="xs">{label}</HStack>}
    </Stack>
  )
}

function getColor(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: 'Low', color: 'red.500' }
    case percent < 66:
      return { label: 'Medium', color: 'orange.500' }
    default:
      return { label: 'High', color: 'green.500' }
  }
}
