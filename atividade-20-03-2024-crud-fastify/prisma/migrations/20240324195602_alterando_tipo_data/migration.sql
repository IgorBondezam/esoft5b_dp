/*
  Warnings:

  - Added the required column `updatedAt` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tarefa" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "dataCriacao" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "dataCriacao" SET DATA TYPE DATE,
ALTER COLUMN "dataConclusao" SET DATA TYPE DATE;
