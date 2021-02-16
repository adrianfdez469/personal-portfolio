/*
  Warnings:

  - You are about to drop the `_ProjectToSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToSkill" DROP CONSTRAINT "_ProjectToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToSkill" DROP CONSTRAINT "_ProjectToSkill_B_fkey";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "skillId" INTEGER;

-- AlterTable
ALTER TABLE "skills" ALTER COLUMN "projectId" DROP NOT NULL;

-- DropTable
DROP TABLE "_ProjectToSkill";

-- AddForeignKey
ALTER TABLE "projects" ADD FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
