// Fonction pour nettoyer le HTML des descriptions
export function cleanHtmlDescription(html: string): string {
  if (!html) return ''

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

// Fonction pour décoder les entités HTML courantes
export function decodeHtmlEntities(text: string): string {
  if (!text) return text

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