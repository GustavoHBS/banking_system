/*
  Warnings:

  - You are about to alter the column `cpf` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - You are about to drop the column `senderId` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderTransferId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_senderId_fkey";

-- DropIndex
DROP INDEX "transactions_senderId_key";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "senderId",
ADD COLUMN     "senderTransferId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_senderTransferId_key" ON "transactions"("senderTransferId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_senderTransferId_fkey" FOREIGN KEY ("senderTransferId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
