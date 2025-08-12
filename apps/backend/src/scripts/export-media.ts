import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import * as dotenv from 'dotenv'
import { Media } from '../entities/media.entity'

// Charger les variables d'environnement
dotenv.config()

async function exportMedia() {
  console.log('🚀 Début de l\'export des médias...')

  // Configuration MikroORM directement dans le script
  const orm = await MikroORM.init({
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME || 'gazette_db',
    debug: process.env.NODE_ENV === 'development',
    metadataProvider: TsMorphMetadataProvider,
    entities: [Media], // Utilisation directe de l'entité
  })

  try {
    // Création d'un contexte isolé (fork)
    const em = orm.em.fork()

    // Récupération de tous les médias
    const mediaRepository = em.getRepository(Media)
    const allMedia = await mediaRepository.findAll()

    console.log(`📊 ${allMedia.length} médias trouvés`)

    // Formatage des données (on enlève les propriétés internes de MikroORM)
    const mediaData = allMedia.map(media => ({
      name: media.name,
      description: media.description,
      picture: media.picture,
      urlRss: media.urlRss,
    }))

    // Chemin vers le fichier de données
    const outputPath = join(__dirname, '..', 'seeders', 'data', 'media-data.json')

    // Sauvegarde du fichier JSON
    writeFileSync(outputPath, JSON.stringify(mediaData, null, 2))

    console.log('✅ Export terminé !')
    console.log(`📁 Fichier sauvegardé : ${outputPath}`)
  }
  catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
  }
  finally {
    // Fermeture de la connexion
    await orm.close()
  }
}

// Exécution du script
exportMedia()
