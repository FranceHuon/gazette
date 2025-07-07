// import { Injectable } from '@nestjs/common'
// import { Cron } from '@nestjs/schedule'
// // import { ContentService } from '../content/content.service'
// import { RssService } from '../rss/rss.service'

// @Injectable()
// export class JobService {
//   constructor(
//     private readonly rssService: RssService,
//     // private readonly contentService: ContentService,
//   ) {}

//   @Cron('0 0 * * *') // toutes les 24 heures (minuit)
//   async handleCron() {
//     console.warn('[CRON] Lancement de la synchronisation des flux RSS...')

//     try {
//       const result = await this.contentService.syncRssFeeds()
//       console.warn(`[CRON] Synchronisation terminée: ${result.created} créés, ${result.updated} mis à jour, ${result.errors} erreurs`)
//     }
//     catch (error) {
//       console.error('[CRON] Erreur lors de la synchronisation:', error)
//     }
//   }
// }
