/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[url]` on the table `links`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "links.url_unique" ON "links"("url");
