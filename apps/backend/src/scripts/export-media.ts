import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import * as dotenv from 'dotenv'
import { Media } from '../entities/media.entity'

dotenv.config()

async function exportMedia() {
  console.log('🚀 Début de l\'export des médias...')

  const orm = await MikroORM.init({
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME || 'gazette_db',
    debug: process.env.NODE_ENV === 'development',
    metadataProvider: TsMorphMetadataProvider,
    entities: [Media],
  })

  try {
    const em = orm.em.fork()

    const mediaRepository = em.getRepository(Media)
    const allMedia = await mediaRepository.findAll()

    console.log(`📊 ${allMedia.length} médias trouvés`)

    const mediaData = allMedia.map(media => ({
      name: media.name,
      description: media.description,
      picture: media.picture,
      urlRss: media.urlRss,
    }))

    const outputPath = join(__dirname, '..', 'seeders', 'data', 'media-data.json')

    writeFileSync(outputPath, JSON.stringify(mediaData, null, 2))

    console.log('✅ Export terminé !')
    console.log(`📁 Fichier sauvegardé : ${outputPath}`)
  }
  catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
  }
  finally {
    await orm.close()
  }
}

exportMedia()
