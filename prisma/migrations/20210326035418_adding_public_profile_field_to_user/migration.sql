/*
  Warnings:

  - Made the column `theme` on table `users` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "public_profile" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "theme" SET NOT NULL;
