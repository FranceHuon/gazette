import { Migration } from '@mikro-orm/migrations'

export class Migration20250714160000_RemoveRoleColumn extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop column "role";`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "role" text check ("role" in ('admin', 'user', 'moderator')) not null default 'user';`)
  }
}
