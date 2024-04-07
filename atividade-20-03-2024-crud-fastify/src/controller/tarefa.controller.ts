import { Tarefa } from '../domain/interfaces/tarefa.interface';
import { FastifyInstance } from "fastify";
import TarefaService from "../service/tarefa.service";
import { Status } from '../domain/enums/status.enum';
import { rotaAutenticada } from './autenticacao.controller.config';

export const tarefaRoutes = async (fastify: FastifyInstance) =>{
    
    const service = TarefaService;

    fastify.get<{Params: {id: number}}>('/', rotaAutenticada, async (request, reply)=>{
        try {
            reply.send(await service.findAll());
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar tarefa, não há tarefas para serem carregadas!'})
        }
    });

    fastify.get<{Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try {
            reply.status(200).send(await service.findById(Number(request.params.id)));
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });

    fastify.post<{Body: Tarefa}>('/', rotaAutenticada, async (request, reply)=>{
        try{
            await service.create(request.body);
            reply.status(201).send({message: 'Tarefa cadastrada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao criar novo tarefa!'})
        }
    });

    fastify.put<{Body: Tarefa, Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try{
            await service.update(Number(request.params.id), request.body);
            reply.status(200).send({message: 'Tarefa atualizada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });

    fastify.delete<{Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try{
            await service.delete(Number(request.params.id));
            reply.status(204).send({message: 'Tarefa deletada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar tarefa para o id indicado!'})
        }
    });


    fastify.get<{Params: {categoriaId: number}}>('/categoria/:categoriaId', rotaAutenticada, async (request, reply) => {
        try {
            const tarefasByCategoria: Promise<Tarefa[]> = service.findByCategoria(Number(request.params.categoriaId));
            reply.status(200).send( await tarefasByCategoria);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar tarefas por categoria!'})
        }
    });

    fastify.get('/concluidas', rotaAutenticada, async (request, reply) => {
        try {
            const tarefasByStatus: Promise<Tarefa[]> = service.findByStatus(Status.CONCLUIDO);
            reply.status(200).send( await tarefasByStatus);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar tarefas concluídas!'})
        }
    });

    fastify.get('/pendentes', rotaAutenticada, async (request, reply) => {
        try {
            const tarefasByStatus: Promise<Tarefa[]> = service.findByStatus(Status.PENDENTE);
            reply.status(200).send( await tarefasByStatus);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar tarefas pendentes!'})
        }
    });

    fastify.get<{Params: {dataInicio: Date, dataConclusao: Date}}>('/vencer/:dataInicio/:dataConclusao', rotaAutenticada, async (request, reply) => {
        try {
            const tarefasVaoVencer: Promise<Tarefa[]> = service.findVencerEm(request.params.dataInicio, request.params.dataConclusao);
            reply.status(200).send( await tarefasVaoVencer);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar tarefas que irão vencer em!'})
        }
    });

    fastify.get<{Params: {usuarioId: number}}>('/count/:usuarioId', rotaAutenticada, async (request, reply) => {
        try {
            const quantidadeTarefasByUsuario: Promise<number> = 
                service.findCountByUsuario(Number(request.params.usuarioId));
            reply.status(200).send( await quantidadeTarefasByUsuario);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a quantidade de tarefas!'})
        }
    });

    fastify.get<{Params: {usuarioId: number}}>('/recente/:usuarioId', rotaAutenticada, async (request, reply) => {
        try {
            const tarefaMaisRecenteByUsuario: Promise<Tarefa> = 
                service.findTarefaMaisRecente(Number(request.params.usuarioId));
            reply.status(200).send( await tarefaMaisRecenteByUsuario);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a tarefa mais recente!'})
        }
    });

    fastify.get<{Params: {usuarioId: number}}>('/antiga/:usuarioId', rotaAutenticada, async (request, reply) => {
        try {
            const tarefaMaisAntigaByUsuario: Promise<Tarefa> = 
                service.findTarefaMaisAntiga(Number(request.params.usuarioId));
            reply.status(200).send( await tarefaMaisAntigaByUsuario);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a tarefa mais recente!'})
        }
    });

    fastify.get('/agrupar/categoria', rotaAutenticada, async (request, reply) => {
        try {
            const tarefasAgrupadasPorCategoria: Promise<Tarefa[]> = 
                service.findTarefaAgruparPorCategoria();
            reply.status(200).send( await tarefasAgrupadasPorCategoria);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a tarefa mais recente!'})
        }
    });

    fastify.get('/maior/descricao', rotaAutenticada, async (request, reply) => {
        try {
            const tarefaMaiorDescricao: Promise<Tarefa> = 
                service.findMaiorDescricao();
            reply.status(200).send( await tarefaMaiorDescricao);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a tarefa com maior descrição!'})
        }
    });

    fastify.get('/media/conclusao/tarefa', rotaAutenticada, async (request, reply) => {
        try {
            const mediaConclusaoTarefa: Promise<number> = 
                service.mediaConclusaoTarefa();
            reply.status(200).send( await mediaConclusaoTarefa);
        } catch (error) {
            reply.status(400).send({message: 'Erro ao buscar a média de conclusão de tarefas!'})
        }
    });
}
