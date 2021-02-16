/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slug]` on the table `users`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users.slug_unique" ON "users"("slug");
