import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableItems1725888465944 implements MigrationInterface {
    name = 'CreateTableItems1725888465944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL DEFAULT '1', "sales" integer NOT NULL, "rate" integer NOT NULL DEFAULT '0', "amount" integer NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "UQ_213736582899b3599acaade2cd1" UNIQUE ("name"), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
