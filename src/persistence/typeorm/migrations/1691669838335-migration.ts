import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691669838335 implements MigrationInterface {
  name = 'Migration1691669838335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authorId" uuid NOT NULL, "description" text NOT NULL, "title" text NOT NULL, CONSTRAINT "PK_book_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "role" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "UQ_user_username" UNIQUE ("username"), CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
