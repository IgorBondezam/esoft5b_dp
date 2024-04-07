import { Categoria, Status, Usuario } from "@prisma/client"

export interface Tarefa{
    id: number,
    titulo: string,
    descricao: string,
    dataCriacao?: Date,
    dataConclusao?: Date,
    tipo: string,
    status: Status,
    usuario?: Usuario,
    categoria?: Categoria,
    usuarioId: number,
    categoriaId?: number,
}