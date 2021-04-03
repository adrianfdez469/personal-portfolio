-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender";
