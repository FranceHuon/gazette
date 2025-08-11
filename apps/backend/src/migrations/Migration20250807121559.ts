import { Migration } from '@mikro-orm/migrations'

export class Migration20250807121559 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column if not exists "has_onboarded" boolean not null default false;`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "role" text check ("role" in ('admin', 'user', 'moderator')) not null default 'user';`)
  }
}
