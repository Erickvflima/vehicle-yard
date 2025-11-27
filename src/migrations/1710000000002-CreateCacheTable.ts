import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCacheTable1710000000002 implements MigrationInterface {
  name = 'CreateCacheTable1710000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS query_result_cache_vehicles(
          id SERIAL NOT NULL,
          identifier varchar(255),
          time bigint,
          duration bigint,
          query text,
          result text,
          PRIMARY KEY(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS query_result_cache_vehicles`);
  }
}
