import * as path from 'node:path'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { ContentModule } from './modules/content/content.module'
import { LikesModule } from './modules/like/like.module'
import { JobService } from './modules/job/job.service'
import { JwtConfigModule } from './modules/jwt/jwt.config.module'
import { MediaModule } from './modules/media/media.module'
import { RssModule } from './modules/rss/rss.module'
import { SubscriptionsModule } from './modules/subscription/subscription.module'
import { UsersModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, any>) => {
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
      useFactory: (configService: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: configService.get<string>('DB_HOST'),
        port: Number.parseInt(configService.get<string>('DB_PORT', '5432')),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        dbName: configService.get<string>('DB_NAME'),
        debug: configService.get<string>('NODE_ENV') === 'development',
        metadataProvider: TsMorphMetadataProvider,
        entities: [path.join(__dirname, 'entities', '*.entity.js')],
        entitiesTs: [path.join(__dirname, 'entities', '*.entity.ts')],
        migrations: {
          path: './dist/migrations',
          pathTs: './src/migrations',
          tableName: 'mikro_orm_migrations',
          transactional: true,
          allOrNothing: true,
          dropTables: false,
          safe: true,
          emit: 'ts',
        },
        validateRequired: true,
      }),
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
