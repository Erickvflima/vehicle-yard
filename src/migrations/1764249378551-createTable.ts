import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1764249378551 implements MigrationInterface {
    name = 'CreateTable1764249378551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "name" character varying(200) NOT NULL, CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."vehicle_usage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(100), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(100), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "reason" text NOT NULL, "driver_id" uuid, "vehicle_id" uuid, CONSTRAINT "PK_665882590f2dc763041735ee5d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."vehicle_usage" ADD CONSTRAINT "FK_c0b75ead099d4712e7a87334e3a" FOREIGN KEY ("driver_id") REFERENCES "dbo"."drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."vehicle_usage" ADD CONSTRAINT "FK_6aff0ec40ff474e6228c1125f5c" FOREIGN KEY ("vehicle_id") REFERENCES "dbo"."vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."vehicle_usage" DROP CONSTRAINT "FK_6aff0ec40ff474e6228c1125f5c"`);
        await queryRunner.query(`ALTER TABLE "dbo"."vehicle_usage" DROP CONSTRAINT "FK_c0b75ead099d4712e7a87334e3a"`);
        await queryRunner.query(`DROP TABLE "dbo"."vehicle_usage"`);
        await queryRunner.query(`DROP TABLE "dbo"."drivers"`);
    }

}
