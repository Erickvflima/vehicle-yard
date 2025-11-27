import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1710000000001 implements MigrationInterface {
  name = 'CreateSchema1710000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS dbo`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS dbo CASCADE`);
  }
}
