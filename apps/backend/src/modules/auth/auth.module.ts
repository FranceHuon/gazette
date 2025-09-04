import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from '@/entities/user.entity'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthGuard } from '@/modules/auth/auth.guard'
import { AuthService } from '@/modules/auth/auth.service'
import { JwtConfigModule } from '@/modules/jwt/jwt.config.module'
import { UsersModule } from '@/modules/user/user.module'

@Module({
  imports: [
    UsersModule,
    JwtConfigModule,
    MikroOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
