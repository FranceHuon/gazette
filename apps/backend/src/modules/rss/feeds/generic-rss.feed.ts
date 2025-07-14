import { FeedSource, RssItemDto } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'
import { RSS_SOURCES, RssSourceKey } from '../../../config/rss-sources'

interface GenericRssConfig {
  sourceKey: RssSourceKey
  titleCleaner?: (title: string) => string
  descriptionCleaner?: (description: string) => string
  extractLogo?: (channel: any) => string | undefined
}

export function createGenericRssFeed(config: GenericRssConfig): FeedSource {
  const sourceConfig = RSS_SOURCES[config.sourceKey]

  return {
    name: config.sourceKey,
    url: sourceConfig.url,

    async fetch(): Promise<RssItemDto[]> {
      const res = await fetch(this.url)
      const xml = await res.text()
      const parser = new XMLParser()
      const data = parser.parse(xml)

      const channel = data.rss?.channel
      let logoUrl: string | undefined

      if (config.extractLogo) {
        logoUrl = config.extractLogo(channel)
      }
      else if (channel?.image) {
        logoUrl = channel.image.url
      }

      const items = data.rss?.channel?.item ?? []

      return items.map((item: any): RssItemDto => ({
        title: config.titleCleaner ? config.titleCleaner(item.title) : item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description
          ? (config.descriptionCleaner ? config.descriptionCleaner(item.description) : item.description)
          : undefined,
        source: config.sourceKey,
        logo: logoUrl,
      }))
    },
  }
}
