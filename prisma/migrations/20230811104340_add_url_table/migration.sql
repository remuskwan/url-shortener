-- CreateTable
CREATE TABLE "URL" (
    "id" STRING NOT NULL,
    "hash" STRING NOT NULL,
    "original_url" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "user_id" STRING NOT NULL,
    "qr_code" STRING,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_hash_key" ON "URL"("hash");

-- AddForeignKey
ALTER TABLE "URL" ADD CONSTRAINT "URL_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
