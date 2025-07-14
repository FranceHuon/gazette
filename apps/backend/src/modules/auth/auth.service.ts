import type { LoginDto } from '@gazette/shared'
import type { Response } from 'express'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService, verifyPassword } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOne(loginDto.email)
      if (!user) {
        throw new UnauthorizedException('Invalid credentials')
      }

      const isPasswordValid = await verifyPassword(loginDto.password, user.password)
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials')
      }

      const payload = { id: user.id, email: user.email, pseudo: user.pseudo }
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: this.configService.get('JWT_SECRET'),
        }),
      }
    }
    catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new UnauthorizedException('Authentication failed')
    }
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('token', {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    })
  }
}
