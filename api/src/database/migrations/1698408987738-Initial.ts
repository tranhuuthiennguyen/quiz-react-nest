import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1698408987738 implements MigrationInterface {
    name = 'Initial1698408987738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."question_type_enum" AS ENUM('multiple_choice', 'true_false', 'open_ended')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "type" "public"."question_type_enum" NOT NULL DEFAULT 'multiple_choice', "quizId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "is_correct" boolean, "questionId" integer, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
    }

}
