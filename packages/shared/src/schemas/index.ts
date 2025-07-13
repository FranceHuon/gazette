import { z } from 'zod'
import { UserRole } from '../enums'

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[-[\]()*~_#:?]).{8,}$/

export const CreateUserSchema = z
  .object({
    pseudo: z.string().min(2, { message: 'must be at least 2 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'must contains at least 8 characters' })
      .regex(passwordValidation, { message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character (- [ ] ( ) * ~ _ # : ?)' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'must contains at least 8 characters' })
      .regex(passwordValidation, { message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character (- [ ] ( ) * ~ _ # : ?)' }),
    role: z.nativeEnum(UserRole).default(UserRole.USER).optional(),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  })

export type CreateUserDto = z.infer<typeof CreateUserSchema>

export const LogUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'must contains at least 8 characters' })
      .regex(passwordValidation),
  })

export type LoginUserDto = z.infer<typeof LogUserSchema>
