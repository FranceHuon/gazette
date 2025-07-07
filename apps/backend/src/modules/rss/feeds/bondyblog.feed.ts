import { FeedSource, RssItemDTO } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'

// Fonction simple pour décoder les entités HTML courantes
function decodeHtmlEntities(text: string): string {
  if (!text)
    return text

  // Décoder les entités numériques (&#233; -> é)
  let decoded = text.replace(/&#(\d+);/g, (match, code) => {
    return String.fromCharCode(Number.parseInt(code))
  })

  // Décoder les entités hexadécimales (&#xE9; -> é)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, code) => {
    return String.fromCharCode(Number.parseInt(code, 16))
  })

  // Décoder les entités nommées courantes
  decoded = decoded
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&laquo;/g, '"')
    .replace(/&raquo;/g, '"')
    .replace(/&lsquo;/g, '\'')
    .replace(/&rsquo;/g, '\'')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&bull;/g, '*')

  return decoded
}

export const BondyBlogFeed: FeedSource = {
  name: 'bondyblog',
  url: 'https://www.bondyblog.fr/feed/',

  async fetch(): Promise<RssItemDTO[]> {
    const res = await fetch(this.url)
    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    console.warn('Objet parsé:', JSON.stringify(data, null, 2))

    // Récupérer les informations du channel (logo, titre, description)
    const channel = data.rss?.channel
    let logoUrl: string | undefined

    if (channel) {
      console.warn('=== INFORMATIONS DU CHANNEL BONDYBLOG ===')
      console.warn('Titre:', channel.title)
      console.warn('Description:', channel.description)
      console.warn('Lien:', channel.link)

      // Informations sur l'image/logo
      if (channel.image) {
        console.warn('=== LOGO BONDYBLOG ===')
        console.warn('URL du logo:', channel.image.url)
        console.warn('Titre du logo:', channel.image.title)
        console.warn('Lien du logo:', channel.image.link)
        logoUrl = channel.image.url
      }
      console.warn('=== FIN INFORMATIONS CHANNEL ===')
    }

    const items = data.rss?.channel?.item ?? []

    return items.map((item: any): RssItemDTO => ({
      title: decodeHtmlEntities(item.title),
      link: item.link,
      pubDate: item.pubDate,
      description: item.description ? decodeHtmlEntities(item.description) : undefined,
      source: 'bondyblog',
      logo: logoUrl,
    }))
  },
}
