import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667322804601 implements MigrationInterface {
    name = 'createTables1667322804601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "extra_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "link" character varying(300) NOT NULL, "lessonId" uuid, CONSTRAINT "PK_4c2f93222a702859f875ebae6db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paragraph" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(5000) NOT NULL, "textId" uuid, CONSTRAINT "PK_c4000792b02bf27771092e4e3c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "text" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "lessonId" uuid, CONSTRAINT "PK_ef734161ea7c326fedf699309f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timeline" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIME NOT NULL, "description" character varying(100) NOT NULL, "videoId" uuid, CONSTRAINT "PK_f841188896cefd9277904ec40b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "link" character varying(300) NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "videoId" uuid NOT NULL, "studyTopicId" uuid NOT NULL, CONSTRAINT "REL_e35de5d5260a5dd79077dfb731" UNIQUE ("videoId"), CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1c508b27fdcee2e802cb5a08d0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studyTopic_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "studyTopicId" uuid, "categoryId" uuid, CONSTRAINT "PK_77435d98b7a061b66cd5a1d96dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "extra_content" ADD CONSTRAINT "FK_e87c76e21991a73a768211ad9c3" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paragraph" ADD CONSTRAINT "FK_0f8774b197db4243983c35e2337" FOREIGN KEY ("textId") REFERENCES "text"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_434f893fcf984eacd2c949b87a2" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeline" ADD CONSTRAINT "FK_aae666c360491a3456f2bed8f3b" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_f1831eb74ae8e4e90b81e411334" FOREIGN KEY ("studyTopicId") REFERENCES "study_topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_e35de5d5260a5dd79077dfb731a" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "study_topic" ADD CONSTRAINT "FK_caf42256fac8ec7f233b6d1c629" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "studyTopic_categories" ADD CONSTRAINT "FK_1235569406cf75d28fbc9ef935f" FOREIGN KEY ("studyTopicId") REFERENCES "study_topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "studyTopic_categories" ADD CONSTRAINT "FK_368d3337b62ace38840beea0012" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studyTopic_categories" DROP CONSTRAINT "FK_368d3337b62ace38840beea0012"`);
        await queryRunner.query(`ALTER TABLE "studyTopic_categories" DROP CONSTRAINT "FK_1235569406cf75d28fbc9ef935f"`);
        await queryRunner.query(`ALTER TABLE "study_topic" DROP CONSTRAINT "FK_caf42256fac8ec7f233b6d1c629"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_e35de5d5260a5dd79077dfb731a"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_f1831eb74ae8e4e90b81e411334"`);
        await queryRunner.query(`ALTER TABLE "timeline" DROP CONSTRAINT "FK_aae666c360491a3456f2bed8f3b"`);
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_434f893fcf984eacd2c949b87a2"`);
        await queryRunner.query(`ALTER TABLE "paragraph" DROP CONSTRAINT "FK_0f8774b197db4243983c35e2337"`);
        await queryRunner.query(`ALTER TABLE "extra_content" DROP CONSTRAINT "FK_e87c76e21991a73a768211ad9c3"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "studyTopic_categories"`);
        await queryRunner.query(`DROP TABLE "study_topic"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "timeline"`);
        await queryRunner.query(`DROP TABLE "text"`);
        await queryRunner.query(`DROP TABLE "paragraph"`);
        await queryRunner.query(`DROP TABLE "extra_content"`);
    }

}
