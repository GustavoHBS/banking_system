/*
  Warnings:

  - You are about to drop the column `idTransfer` on the `Transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_idTransfer_fkey";

-- DropIndex
DROP INDEX "Transactions_idTransfer_key";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "idTransfer",
ADD COLUMN     "senderId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_senderId_key" ON "Transactions"("senderId");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
