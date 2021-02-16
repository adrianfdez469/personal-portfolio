/*
  Warnings:

  - You are about to drop the column `skillId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `skills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_skillId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_projectId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "skillId";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "project_skills" (
    "projectId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("projectId","skillId")
);

-- AddForeignKey
ALTER TABLE "project_skills" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skills" ADD FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
