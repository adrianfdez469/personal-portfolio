/*
  Warnings:

  - You are about to drop the `themes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_themes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_themes" DROP CONSTRAINT "user_themes_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "user_themes" DROP CONSTRAINT "user_themes_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "theme" JSONB NOT NULL DEFAULT '{"palette":{"primary":{"main":"#ff9100"},"secondary":{"main":"#1985ff"},"error":{"main":"#ff1744"},"type":"dark"}}';

-- DropTable
DROP TABLE "themes";

-- DropTable
DROP TABLE "user_themes";
