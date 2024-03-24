import { Categoria, Status, Usuario } from "@prisma/client"

export interface Tarefa{
    id: number,
    titulo: string,
    descricao: string,
    dataCriacao?: Date,
    dataConclusao?: Date,
    tipo: string,
    status: Status,
    usuarioId: number,
    categoriaId?: number,
}