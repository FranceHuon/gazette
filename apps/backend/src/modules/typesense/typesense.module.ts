import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  providers: [
    {
      provide: 'TYPESENSE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Typesense.Client({
          nodes: [
            {
              host: config.get<string>('TYPESENSE_HOST') ?? 'localhost',
              port: Number.parseInt(config.get<string>('TYPESENSE_PORT') ?? '8108', 10),
              protocol: config.get<string>('TYPESENSE_PROTOCOL') ?? 'http',
            },
          ],
          apiKey: config.get<string>('TYPESENSE_API_KEY') ?? 'xyz',
        })
      },
    },
  ],
  exports: ['TYPESENSE_CLIENT'],
})

export class TypesenseModule {}
