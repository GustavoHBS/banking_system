/*
  Warnings:

  - You are about to drop the column `teste` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idTransfer]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "teste",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "idTransfer" BIGINT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_cpf_key" ON "Account"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_idTransfer_key" ON "Transactions"("idTransfer");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_idTransfer_fkey" FOREIGN KEY ("idTransfer") REFERENCES "Transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
