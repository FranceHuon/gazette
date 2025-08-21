export interface ContentDto {
  id: string
  title: string
  link: string
  date: string
  description?: string
  source: string
  logo?: string
  mediaId?: string
}

export interface ContentWithMediaDto extends ContentDto {
  media: {
    id: string
    name: string
    description?: string
    picture?: string
    urlRss?: string
  }
}

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
