-- CreateEnum
CREATE TYPE "SkillCatergory" AS ENUM ('PROG_LANG', 'PROG_TECH', 'OTHER');

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCatergory" NOT NULL DEFAULT E'OTHER',
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
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

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_link_id_unique" ON "Project"("project_link_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_devlink_id_unique" ON "Project"("project_devlink_id");

-- AddForeignKey
ALTER TABLE "Skill" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("project_link_id") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("project_devlink_id") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
