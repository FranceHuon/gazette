import { FeedSource } from '@gazette/shared'
import { createGenericRssFeed } from './generic-rss.feed'

export const BondyBlogFeed: FeedSource = createGenericRssFeed({
  sourceKey: 'bondyblog',
})

export const ArretSurImageFeed: FeedSource = createGenericRssFeed({
  sourceKey: 'arretsurimage',
  descriptionCleaner: (description: string) => {
    return description.replace(/<[^>]*>/g, '').trim()
  },
})

export const BlastFeed: FeedSource = createGenericRssFeed({
  sourceKey: 'blast',
})

export const RSS_FEEDS = {
  bondyblog: BondyBlogFeed,
  arretsurimage: ArretSurImageFeed,
  blast: BlastFeed,
}
