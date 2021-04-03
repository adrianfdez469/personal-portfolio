/*
  Warnings:

  - You are about to drop the column `revalidationTime` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "revalidationTime",
ADD COLUMN     "gitlabLink" TEXT,
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "linkedinLink" TEXT,
ADD COLUMN     "twitterLink" TEXT;
