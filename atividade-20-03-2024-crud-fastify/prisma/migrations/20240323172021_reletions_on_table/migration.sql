/*
  Warnings:

  - A unique constraint covering the columns `[categoriaId]` on the table `tarefa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriaId` to the `tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tarefa" ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tarefa_categoriaId_key" ON "tarefa"("categoriaId");

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
