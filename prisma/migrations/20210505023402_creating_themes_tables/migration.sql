/*
  Warnings:

  - You are about to drop the column `theme` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "theme";

-- CreateTable
CREATE TABLE "themes" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_themes" (
    "user_id" INTEGER NOT NULL,
    "theme_id" INTEGER NOT NULL,
    "actual" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("user_id","theme_id")
);

-- AddForeignKey
ALTER TABLE "user_themes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_themes" ADD FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
