/*
  Warnings:

  - You are about to drop the column `id` on the `URL` table. All the data in the column will be lost.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_URL" (
    "hash" STRING NOT NULL,
    "original_url" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "user_id" STRING,
    "qr_code" STRING,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("hash")
);
DROP INDEX "URL_hash_key";
INSERT INTO "_prisma_new_URL" ("created_at","deleted_at","hash","original_url","qr_code","user_id") SELECT "created_at","deleted_at","hash","original_url","qr_code","user_id" FROM "URL";
DROP TABLE "URL" CASCADE;
ALTER TABLE "_prisma_new_URL" RENAME TO "URL";
ALTER TABLE "URL" ADD CONSTRAINT "URL_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
