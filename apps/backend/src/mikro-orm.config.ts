import type { Options } from '@mikro-orm/core'
import type { ConfigService } from '@nestjs/config'
import * as path from 'node:path'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import dotenv from 'dotenv'

/**
 * Configuration MikroORM unifiée pour CLI et application NestJS
 * Détecte automatiquement le contexte et utilise la source de config appropriée
 */

function createConfig(configSource: 'env' | ConfigService): Options<PostgreSqlDriver> {
  // Fonction pour récupérer une valeur selon le contexte
  const getValue = (key: string, defaultValue?: string): string => {
    if (configSource === 'env') {
      return process.env[key] || defaultValue || ''
    }
    return (configSource as ConfigService).get<string>(key, defaultValue) || ''
  }

  const isCliContext = configSource === 'env'

  return {
    driver: PostgreSqlDriver,
    host: getValue('DB_HOST', 'localhost'),
    port: Number.parseInt(getValue('DB_PORT', '5432')),
    user: getValue('DB_USER', 'postgres'),
    password: getValue('DB_PASSWORD', ''),
    dbName: getValue('DB_NAME', 'gazette_db'),
    debug: getValue('NODE_ENV') === 'development',
    metadataProvider: TsMorphMetadataProvider,
    // Différents patterns d'entités selon le contexte
    entities: isCliContext
      ? ['dist/**/*.entity.js']
      : [path.join(__dirname, 'entities', '*.entity.js')],
    entitiesTs: isCliContext
      ? ['src/**/*.entity.ts']
      : [path.join(__dirname, 'entities', '*.entity.ts')],
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
    // Option spécifique à NestJS
    ...(isCliContext ? {} : { validateRequired: true }),
  }
}

// Export pour le CLI (charge dotenv automatiquement)
dotenv.config()
const cliConfig = createConfig('env')

// Export par défaut pour le CLI
export default cliConfig

// Export de la fonction pour NestJS
export const createMikroOrmConfig = (configService: ConfigService) => createConfig(configService)
