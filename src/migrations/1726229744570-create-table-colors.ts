import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableColors1726229744570 implements MigrationInterface {
    name = 'CreateTableColors1726229744570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "colors"`);
    }

}
