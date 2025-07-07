import { FeedSource, RssItemDTO } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'

export const BlastFeed: FeedSource = {
  name: 'blast',
  url: 'https://api.blast-info.fr/rss.xml',

  async fetch(): Promise<RssItemDTO[]> {
    const res = await fetch(this.url)
    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    console.warn('Objet parsé:', JSON.stringify(data, null, 2))

    // Récupérer les informations du channel (logo, titre, description)
    const channel = data.rss?.channel
    if (channel) {
      console.warn('=== INFORMATIONS DU CHANNEL BLAST ===')
      console.warn('Titre:', channel.title)
      console.warn('Description:', channel.description)
      console.warn('Lien:', channel.link)

      // Informations sur l'image/logo
      if (channel.image) {
        console.warn('=== LOGO BLAST ===')
        console.warn('URL du logo:', channel.image.url)
        console.warn('Titre du logo:', channel.image.title)
        console.warn('Lien du logo:', channel.image.link)
      }
      console.warn('=== FIN INFORMATIONS CHANNEL ===')
    }

    const items = data.rss?.channel?.item ?? []

    return items.map((item: any): RssItemDTO => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      source: 'blast',
    }))
  },
}
