import { CategoriaCreate } from '../domain/interfaces/categoria.interface';
import { FastifyInstance } from "fastify";
import CategoriaService from "../service/categoria.service";
import { rotaAutenticada } from './autenticacao.controller.config';


export const categoriaRoutes = async (fastify: FastifyInstance) =>{
    
    const service = CategoriaService;

    fastify.get<{Params: {id: number}}>('/', rotaAutenticada, async (request, reply)=>{
        try {
            reply.send(await service.findAll());
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar categoria, não há categorias para serem carregadas!'})
        }
    });

    fastify.get<{Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try {
            reply.status(200).send(await service.findById(Number(request.params.id)));
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar categoria para o id indicado!'})
        }
    });

    fastify.post<{Body: CategoriaCreate}>('/', rotaAutenticada, async (request, reply)=>{
        try{
            await service.create(request.body);
            reply.status(201).send({message: 'Categoria cadastrada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao criar novo categoria!'})
        }
    });

    fastify.put<{Body: CategoriaCreate, Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try{
            await service.update(Number(request.params.id), request.body);
            reply.status(200).send({message: 'Categoria atualizada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar categoria para o id indicado!'})
        }
    });

    fastify.delete<{Params: {id: number}}>('/:id', rotaAutenticada, async (request, reply)=>{
        try{
            await service.delete(Number(request.params.id));
            reply.status(204).send({message: 'Categoria deletada com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar categoria para o id indicado!'})
        }
    });
}
