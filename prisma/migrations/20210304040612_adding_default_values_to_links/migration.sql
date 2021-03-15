/*
  Warnings:

  - Made the column `title` on table `links` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `description` on table `links` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `links` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "links" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT E'',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'',
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT E'';
