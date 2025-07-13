import { ContentDto, FeedSource } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'

// Fonction pour nettoyer le HTML des descriptions
function cleanHtmlDescription(html: string): string {
  if (!html)
    return ''

  // Supprimer les balises HTML tout en gardant le texte
  return html
    .replace(/<[^>]*>/g, '') // Supprime toutes les balises HTML
    .replace(/&nbsp;/g, ' ') // Remplace les espaces insécables
    .replace(/&amp;/g, '&') // Remplace les &
    .replace(/&lt;/g, '<') // Remplace les <
    .replace(/&gt;/g, '>') // Remplace les >
    .replace(/&quot;/g, '"') // Remplace les "
    .replace(/&apos;/g, '\'') // Remplace les '
    .trim() // Supprime les espaces en début et fin
}

export const ArretSurImageFeed: FeedSource = {
  name: 'arretsurimage',
  url: 'https://api.arretsurimages.net/api/public/rss/all-content',

  async fetch(): Promise<ContentDto[]> {
    const res = await fetch(this.url)
    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    console.warn('Objet parsé:', JSON.stringify(data, null, 2))

    // Récupérer les informations du channel (logo, titre, description)
    const channel = data.rss?.channel
    let logoUrl: string | undefined

    if (channel) {
      console.warn('=== INFORMATIONS DU CHANNEL ARRET SUR IMAGE ===')
      console.warn('Titre:', channel.title)
      console.warn('Description:', channel.description)
      console.warn('Lien:', channel.link)

      // Informations sur l'image/logo
      if (channel.image) {
        logoUrl = channel.image.url
      }
    }

    const items = data.rss?.channel?.item ?? []

    return items.map((item: any): ContentDto => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description ? cleanHtmlDescription(item.description) : undefined,
      source: 'arretsurimage',
      logo: logoUrl,
    }))
  },
}
