import { Migration } from '@mikro-orm/migrations'

export class Migration20250713194122 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "like" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "content_id" uuid not null, "created_at" timestamptz not null, constraint "like_pkey" primary key ("id"));`)

    this.addSql(`alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`)
    this.addSql(`alter table "like" add constraint "like_content_id_foreign" foreign key ("content_id") references "content" ("id") on update cascade;`)
  }

  override async down(): Promise<void> {
    this.addSql(`create table "favorite" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "media_type_id" uuid not null, "created_at" timestamptz not null, constraint "favorite_pkey" primary key ("id"));`)

    this.addSql(`alter table "favorite" add constraint "favorite_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`)
    this.addSql(`alter table "favorite" add constraint "favorite_media_type_id_foreign" foreign key ("media_type_id") references "media" ("id") on update cascade;`)
  }
}
