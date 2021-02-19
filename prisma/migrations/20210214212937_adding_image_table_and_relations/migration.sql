/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,category]` on the table `skills`. If there are existing duplicate values, the migration will fail.

*/
-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "projectId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills.name_category_unique" ON "skills"("name", "category");

-- AddForeignKey
ALTER TABLE "images" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
