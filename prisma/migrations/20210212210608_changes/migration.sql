/*
  Warnings:

  - Made the column `userid` on table `projects` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "userid" SET NOT NULL;
