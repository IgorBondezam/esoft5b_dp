import { Tarefa } from '../domain/interfaces/tarefa.interface';
import { FastifyInstance } from "fastify";
import TarefaService from "../service/tarefa.service";


export const tarefaRoutes = async (fastify: FastifyInstance) =>{
    
    const service = TarefaService;

    fastify.get<{Params: {id: number}}>('/', async (request, reply)=>{
        try {
            reply.send(await service.findAll());
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar tarefa, não há tarefas para serem carregadas!'})
        }
    });

    fastify.get<{Params: {id: number}}>('/:id', async (request, reply)=>{
        try {
            reply.status(200).send(await service.findById(Number(request.params.id)));
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });

    fastify.post<{Body: Tarefa}>('/', async (request, reply)=>{
        try{
            await service.create(request.body);
            reply.status(201).send({message: 'Tarefa cadastrada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao criar novo tarefa!'})
        }
    });

    fastify.put<{Body: Tarefa, Params: {id: number}}>('/:id', async (request, reply)=>{
        try{
            await service.update(Number(request.params.id), request.body);
            reply.status(200).send({message: 'Tarefa atualizada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });

    fastify.delete<{Params: {id: number}}>('/:id', async (request, reply)=>{
        try{
            await service.delete(Number(request.params.id));
            reply.status(204).send({message: 'Tarefa deletada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });
}
