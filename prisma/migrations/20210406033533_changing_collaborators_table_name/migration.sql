/*
  Warnings:

  - You are about to drop the `Collaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collaborator" DROP CONSTRAINT "Collaborator_projectid_fkey";

-- CreateTable
CREATE TABLE "collaborators" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "name" TEXT,
    "url" TEXT,
    "is_owner" BOOLEAN NOT NULL,
    "projectid" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Collaborator";

-- AddForeignKey
ALTER TABLE "collaborators" ADD FOREIGN KEY ("projectid") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
