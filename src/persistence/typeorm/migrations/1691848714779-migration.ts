import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691848714779 implements MigrationInterface {
  name = 'Migration1691848714779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "authorId" TO "author_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_book_to_user" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_book_to_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "author_id" TO "authorId"`,
    );
  }
}
