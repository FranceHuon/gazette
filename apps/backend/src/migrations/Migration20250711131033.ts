import { Migration } from '@mikro-orm/migrations'

export class Migration20250711131033 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "content" alter column "description" type varchar(2000) using ("description"::varchar(2000));`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "content" alter column "description" type varchar(255) using ("description"::varchar(255));`)
  }
}
