import type { Options } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

// Les variables d'environnement sont gérées par :
// - NestJS ConfigModule dans l'application
// - process.env directement (Docker/CI)
// - fichier .env en développement local si présent

/**
 * Configuration MikroORM unique - Approche officielle recommandée
 * Fonctionne à la fois pour NestJS et le CLI
 */
const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: Number.parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'gazette_db',
  debug: process.env.NODE_ENV === 'development',
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
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
}

export default config
