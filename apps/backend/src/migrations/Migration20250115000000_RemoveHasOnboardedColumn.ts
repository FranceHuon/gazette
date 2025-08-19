import { Migration } from '@mikro-orm/migrations'

export class Migration20250115000000_RemoveHasOnboardedColumn extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "user" drop column "has_onboarded";')
  }

  override async down(): Promise<void> {
    this.addSql('alter table "user" add column "has_onboarded" boolean not null default false;')
  }
}
