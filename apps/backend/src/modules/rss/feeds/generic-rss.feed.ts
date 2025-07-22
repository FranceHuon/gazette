import { FeedSource, RssItemDto } from '@gazette/shared'
import { XMLParser } from 'fast-xml-parser'
import { RSS_SOURCES, RssSourceKey } from '../../../config/rss-sources'

interface GenericRssConfig {
  sourceKey: RssSourceKey
  titleCleaner?: (title: string) => string
  descriptionCleaner?: (description: string) => string
  extractLogo?: (channel: unknown) => string | undefined
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

      return items.map((item: unknown): RssItemDto => {
        const itemData = item as { title: string, link: string, pubDate: string, description?: string }
        return {
          title: config.titleCleaner ? config.titleCleaner(itemData.title) : itemData.title,
          link: itemData.link,
          pubDate: itemData.pubDate,
          description: itemData.description
            ? (config.descriptionCleaner ? config.descriptionCleaner(itemData.description) : itemData.description)
            : undefined,
          source: config.sourceKey,
          logo: logoUrl,
        }
      })
    },
  }
}
