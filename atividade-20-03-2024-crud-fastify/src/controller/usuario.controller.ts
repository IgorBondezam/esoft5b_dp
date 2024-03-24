import { UsuarioCreate } from './../interfaces/usuario.interface';
import { FastifyInstance } from "fastify";
import UsuarioService from "../service/usuario.service";


export const usuarioRoutes = async (fastify: FastifyInstance) =>{
    
    const service = UsuarioService;

    fastify.get<{Params: {id: number}}>('/', async (request, reply)=>{
        reply.send(await service.findAll());
    });

    fastify.get<{Params: {id: number}}>('/:id', async (request, reply)=>{
        const { id } = request.params;
        reply.status(200).send(await service.findById(Number(id)));
    });

    fastify.post<{Body: UsuarioCreate}>('/', async (request, reply)=>{
        await service.create(request.body);
        reply.status(201).send({message: 'Usuário cadastrado com sucesso!'});
    });

    fastify.put<{Body: UsuarioCreate, Params: {id: number}}>('/:id', async (request, reply)=>{
        await service.update(request.params.id, request.body);
        reply.status(200).send({message: 'Usuário atualizado com sucesso!'});
    });

    fastify.delete<{Params: {id: number}}>('/:id', async (request, reply)=>{
        await service.delete(request.params.id);
        reply.status(204).send({message: 'Usuário deletado com sucesso!'});
    });
}
