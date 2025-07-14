export interface ContentDto {
  id: string
  title: string
  link: string
  pubDate: string
  description?: string
  source: string
  logo?: string
  mediaId?: string // ID du média associé
}

// Type pour les données RSS brutes (avant sauvegarde en base)
export interface RssItemDto {
  title: string
  link: string
  pubDate: string
  description?: string
  source: string
  logo?: string
}

export interface FeedSource {
  name: string
  url: string
  fetch: () => Promise<RssItemDto[]>
}
