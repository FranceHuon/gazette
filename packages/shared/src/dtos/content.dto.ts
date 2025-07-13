export interface ContentDto {
  title: string
  link: string
  pubDate: string
  description?: string
  source: string
  logo?: string
  mediaId?: string // ID du média associé
}

export interface FeedSource {
  name: string
  url: string
  fetch: () => Promise<ContentDto[]>
}
