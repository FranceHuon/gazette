import type { LoginDto } from '@gazette/shared'
import type { Request, Response } from 'express'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(loginDto)

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    })

    return { message: 'Connexion réussie' }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res)
    return { message: 'Déconnexion réussie' }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    return {
      message: 'Profile OK',
      user: req.user,
    }
  }
}
