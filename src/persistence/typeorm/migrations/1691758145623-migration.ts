import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691758145623 implements MigrationInterface {
  name = 'Migration1691758145623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "password_vault" ("id" uuid NOT NULL, "passwordHash" text NOT NULL, CONSTRAINT "UQ_password_vault_user_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_vault" ADD CONSTRAINT "FK_password_vault_to_user" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_vault" DROP CONSTRAINT "FK_password_vault_to_user"`,
    );
    await queryRunner.query(`DROP TABLE "password_vault"`);
  }
}
