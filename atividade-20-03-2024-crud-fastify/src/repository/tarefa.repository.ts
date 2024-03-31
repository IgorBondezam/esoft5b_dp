import { Tarefa } from "../domain/interfaces/tarefa.interface";
import { prisma } from "../../resources/db/prisma-client";

class UsuarioRespository{

    async findAll(): Promise<Tarefa[]>{
        const tarefas: Tarefa[] =  await prisma.tarefa.findMany({
            select: {
                id: true,
                titulo: true,
                descricao: true,
                dataCriacao: true,
                dataConclusao: true,
                tipo: true,
                status: true,
                usuarioId: true,
                categoriaId: true,
            }
        });
        if(tarefas.length == 0){
            throw new Error();
        }
        return tarefas;    }

    async findById(id: number): Promise<Tarefa>{
        return await prisma.tarefa.findUniqueOrThrow({
            where: {
                id: id,
            },
            select:{
                id: true,
                titulo: true,
                descricao: true,
                dataCriacao: true,
                dataConclusao: true,
                tipo: true,
                status: true,
                usuario: true,
                categoria: true,
                usuarioId: true,
                categoriaId: true,
            }
        });
    }

    async create(usuario: Tarefa): Promise<void>{
        const { id, titulo, descricao, dataCriacao, dataConclusao, tipo, status, usuarioId, categoriaId } = usuario
        await prisma.tarefa.create({
           data: {
                id,
                titulo,
                descricao,
                dataCriacao,
                dataConclusao: dataConclusao ?? null,
                tipo, 
                status,
                usuarioId,
                categoriaId
           }    
        });
    }

    async update(id: number, tarefa: Tarefa): Promise<void>{
        await prisma.tarefa.update({
            where:{id: id},
           data: {
                id: tarefa.id,
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                dataCriacao: tarefa.dataCriacao,
                dataConclusao: tarefa.dataConclusao,
                tipo: tarefa.tipo,
                status: tarefa.status,
                usuarioId: tarefa.usuarioId,
                categoriaId: tarefa.categoriaId
           }    
        });
    }

    async delete(id: number): Promise<void>{
        await prisma.tarefa.delete({
            where:{id: id}
        });
    }
}

export default new UsuarioRespository();