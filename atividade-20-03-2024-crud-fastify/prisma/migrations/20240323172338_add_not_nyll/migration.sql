-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_categoriaId_fkey";

-- AlterTable
ALTER TABLE "tarefa" ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
