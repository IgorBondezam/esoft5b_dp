import { Status } from "@prisma/client"

export interface Tarefa{
    id: number,
    titulo: string,
    descricao: string
    dataCriacao: Date
    dataConclusao?: Date
    tipo: string
    status: Status
    userId: number
    categoriaId?: number
}