/*
  Warnings:

  - You are about to drop the column `project_link_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `project_devlink_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "projects_project_link_id_unique";

-- DropIndex
DROP INDEX "projects_project_devlink_id_unique";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_project_devlink_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_project_link_id_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "project_link_id",
DROP COLUMN "project_devlink_id",
ADD COLUMN     "project_link" TEXT,
ADD COLUMN     "project_devlink" INTEGER;

-- DropTable
DROP TABLE "links";
