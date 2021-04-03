/*
  Warnings:

  - You are about to drop the column `gitlabLink` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `githubLink` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinLink` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twitterLink` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "gitlabLink",
DROP COLUMN "githubLink",
DROP COLUMN "linkedinLink",
DROP COLUMN "twitterLink",
ADD COLUMN     "gitlab_link" TEXT,
ADD COLUMN     "github_link" TEXT,
ADD COLUMN     "linkedin_link" TEXT,
ADD COLUMN     "twitter_link" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "experience" INTEGER;
