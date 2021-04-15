/*
  Warnings:

  - Added the required column `project_slug` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "project_slug" TEXT NOT NULL;
