import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { createMikroOrmConfig } from './mikro-orm.config'
import { AuthModule } from './modules/auth/auth.module'
import { ContentModule } from './modules/content/content.module'
import { JobService } from './modules/job/job.service'
import { JwtConfigModule } from './modules/jwt/jwt.config.module'
import { LikesModule } from './modules/like/like.module'
import { MediaModule } from './modules/media/media.module'
import { RssModule } from './modules/rss/rss.module'
import { SubscriptionsModule } from './modules/subscription/subscription.module'
import { UsersModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        return config
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        },
      },
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return createMikroOrmConfig(configService)
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    ContentModule,
    JwtConfigModule,
    LikesModule,
    RssModule,
    MediaModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobService],
})
export class AppModule { }
