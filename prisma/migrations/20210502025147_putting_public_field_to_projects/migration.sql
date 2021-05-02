-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_fk";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_fk";

-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_fk";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "public_project" BOOLEAN NOT NULL DEFAULT true;
