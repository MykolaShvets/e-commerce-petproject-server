import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBrands1726232554968 implements MigrationInterface {
    name = 'CreateTableBrands1726232554968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "items" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_210d0afcca69dba4a9d3304029b" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_210d0afcca69dba4a9d3304029b"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "brandId"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
