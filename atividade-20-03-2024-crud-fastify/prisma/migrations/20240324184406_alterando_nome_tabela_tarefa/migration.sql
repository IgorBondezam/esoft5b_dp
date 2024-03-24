/*
  Warnings:

  - You are about to drop the column `userId` on the `tarefa` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_userId_fkey";

-- AlterTable
ALTER TABLE "tarefa" DROP COLUMN "userId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
