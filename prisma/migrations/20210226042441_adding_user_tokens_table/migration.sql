-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('github', 'gitlab', 'linkedIn');

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider" "Provider" NOT NULL,
    "access_token" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_tokens.access_token_unique" ON "user_tokens"("access_token");
