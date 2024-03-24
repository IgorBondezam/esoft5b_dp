/*
  Warnings:

  - You are about to alter the column `peso` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,3)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "tarefa" ALTER COLUMN "dataConclusao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "peso" SET DATA TYPE DOUBLE PRECISION;
