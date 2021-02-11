/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_project_devlink_id_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_project_link_id_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userid_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_projectId_fkey";

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCatergory" NOT NULL DEFAULT E'OTHER',
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "initial_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "other_info" TEXT,
    "userid" INTEGER NOT NULL,
    "project_link_id" INTEGER NOT NULL,
    "project_devlink_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Skill";

-- CreateIndex
CREATE UNIQUE INDEX "projects_project_link_id_unique" ON "projects"("project_link_id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_project_devlink_id_unique" ON "projects"("project_devlink_id");

-- AddForeignKey
ALTER TABLE "skills" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD FOREIGN KEY ("project_link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD FOREIGN KEY ("project_devlink_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
