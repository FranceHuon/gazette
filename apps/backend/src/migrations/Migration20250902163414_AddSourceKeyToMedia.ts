import { Migration } from '@mikro-orm/migrations'

export class Migration20250902163414_AddSourceKeyToMedia extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "media" add column "source_key" varchar(255) null, add column "is_active" boolean not null default true;`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "has_onboarded" boolean not null;`)
  }
}
