import { Migration } from '@mikro-orm/migrations'

export class Migration20250811135000_UpdateBondyBlogToLocalSVG extends Migration {
  override async up(): Promise<void> {
    // Mettre à jour l'URL de l'image BondyBlog vers le fichier SVG local
    this.addSql(`
      UPDATE "media" 
      SET "picture" = '/bondyblog.svg' 
      WHERE "url_rss" = 'https://www.bondyblog.fr/feed/' 
      AND "name" = 'Bondy Blog'
    `)
  }

  override async down(): Promise<void> {
    // Remettre l'ancienne URL externe (même si elle ne fonctionne plus)
    this.addSql(`
      UPDATE "media" 
      SET "picture" = 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png' 
      WHERE "url_rss" = 'https://www.bondyblog.fr/feed/' 
      AND "name" = 'Bondy Blog'
    `)
  }
}
