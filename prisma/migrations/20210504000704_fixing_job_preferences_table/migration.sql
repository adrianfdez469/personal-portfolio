/*
  Warnings:

  - The migration will change the primary key for the `job_preferences` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `job_preferences` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE "job_preferences_user_id_seq";
ALTER TABLE "job_preferences" DROP CONSTRAINT "job_preferences_pkey",
DROP COLUMN "id",
ALTER COLUMN "user_id" SET DEFAULT nextval('job_preferences_user_id_seq'),
ADD PRIMARY KEY ("user_id");
ALTER SEQUENCE "job_preferences_user_id_seq" OWNED BY "public"."job_preferences"."user_id";
