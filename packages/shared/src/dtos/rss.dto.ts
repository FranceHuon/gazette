export interface RssItemDTO {
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
  fetch: () => Promise<RssItemDTO[]>
}
