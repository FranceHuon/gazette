import { Migration } from '@mikro-orm/migrations'

export class Migration20250706145135 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "subscription" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "media_id" uuid not null, "created_at" timestamptz not null, constraint "subscription_pkey" primary key ("id"));`)

    this.addSql(`alter table "subscription" add constraint "subscription_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`)
    this.addSql(`alter table "subscription" add constraint "subscription_media_id_foreign" foreign key ("media_id") references "media" ("id") on update cascade;`)
  }
}
