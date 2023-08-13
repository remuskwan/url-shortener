/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `URL` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "URL" DROP COLUMN "deleted_at";

-- DropTable
DROP TABLE "VerificationToken";
