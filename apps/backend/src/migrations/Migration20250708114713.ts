import { Migration } from '@mikro-orm/migrations'

export class Migration20250708114713 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "content" drop constraint "content_media_id_id_foreign";`)

    this.addSql(`alter table "content" rename column "media_id_id" to "media_id";`)
    this.addSql(`alter table "content" add constraint "content_media_id_foreign" foreign key ("media_id") references "media" ("id") on update cascade on delete set null;`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "content" drop constraint "content_media_id_foreign";`)

    this.addSql(`alter table "content" rename column "media_id" to "media_id_id";`)
    this.addSql(`alter table "content" add constraint "content_media_id_id_foreign" foreign key ("media_id_id") references "media" ("id") on update cascade on delete set null;`)
  }
}
