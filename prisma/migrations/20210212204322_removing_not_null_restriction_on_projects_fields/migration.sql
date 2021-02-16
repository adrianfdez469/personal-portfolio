-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "userid" DROP NOT NULL,
ALTER COLUMN "project_link_id" DROP NOT NULL,
ALTER COLUMN "project_devlink_id" DROP NOT NULL;
