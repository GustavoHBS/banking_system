/*
  Warnings:

  - You are about to drop the column `senderTransferId` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderTransactionId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_senderTransferId_fkey";

-- DropIndex
DROP INDEX "transactions_senderTransferId_key";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "senderTransferId",
ADD COLUMN     "senderTransactionId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_senderTransactionId_key" ON "transactions"("senderTransactionId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_senderTransactionId_fkey" FOREIGN KEY ("senderTransactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
