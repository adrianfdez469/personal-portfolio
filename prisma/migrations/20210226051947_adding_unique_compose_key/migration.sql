/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[user_id,provider]` on the table `user_tokens`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_tokens.user_id_provider_unique" ON "user_tokens"("user_id", "provider");
