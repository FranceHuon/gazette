export const RSS_SOURCES = {
  bondyblog: {
    name: 'Bondy Blog',
    url: 'https://www.bondyblog.fr/feed/',
    description: 'Blog d\'actualités et d\'investigation',
    picture: 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png',
  },
  arretsurimage: {
    name: 'Arrêt sur Images',
    url: 'https://api.arretsurimages.net/api/public/rss/all-content',
    description: 'Média d\'analyse des médias',
    picture: 'https://www.arretsurimages.net/images/logo-asi.png',
  },
  blast: {
    name: 'Blast',
    url: 'https://api.blast-info.fr/rss.xml',
    description: 'Média d\'investigation',
    picture: 'https://www.blast-info.fr/assets/images/logo-blast.png',
  },
} as const

export type RssSourceKey = keyof typeof RSS_SOURCES
