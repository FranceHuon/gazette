import { ContentDto, FeedSource } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'

export const BlastFeed: FeedSource = {
  name: 'blast',
  url: 'https://api.blast-info.fr/rss.xml',

  async fetch(): Promise<ContentDto[]> {
    const res = await fetch(this.url)
    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    const items = data.rss?.channel?.item ?? []

    // Log de la structure complète du premier article
    if (items.length > 0) {
      console.warn('=== STRUCTURE COMPLÈTE DU PREMIER ARTICLE BLAST ===')
      console.warn('Tous les champs disponibles:', Object.keys(items[0]))
      console.warn('Valeur complète:', JSON.stringify(items[0], null, 2))
      console.warn('=== FIN STRUCTURE ===')
    }

    return items.map((item: any): ContentDto => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      source: 'blast',
    }))
  },
}
