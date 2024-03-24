import { UsuarioCreate, UsuarioLogin } from '../domain/interfaces/usuario.interface';
import { FastifyInstance } from "fastify";
import UsuarioService from "../service/usuario.service";


export const usuarioRoutes = async (fastify: FastifyInstance) =>{
    
    const service = UsuarioService;

    fastify.get<{Params: {id: number}}>('/', async (request, reply)=>{
        try {
            reply.send(await service.findAll());
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar usuário, não há usuários para serem carregados!'})
        }
    });

    fastify.get<{Params: {id: number}}>('/:id', async (request, reply)=>{
        try {
            reply.status(200).send(await service.findById(Number(request.params.id)));
        } catch(e){
            console.error(e)
            reply.status(404).send({message: 'Erro ao buscar usuário para o id indicado!'})
        }
    });

    fastify.post<{Body: UsuarioCreate}>('/', async (request, reply)=>{
        try{
            await service.create(request.body);
            reply.status(201).send({message: 'Usuário cadastrado com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao criar novo usuário!'})
        }
    });

    fastify.put<{Body: UsuarioCreate, Params: {id: number}}>('/:id', async (request, reply)=>{
        try{
            await service.update(Number(request.params.id), request.body);
            reply.status(200).send({message: 'Usuário atualizado com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar usuário para o id indicado!'})
        }
    });

    fastify.delete<{Params: {id: number}}>('/:id', async (request, reply)=>{
        try{
            await service.delete(Number(request.params.id));
            reply.status(204).send({message: 'Usuário deletado com sucesso!'});
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao buscar usuário para o id indicado!'})
        }
    });

    fastify.post<{Body: UsuarioLogin}>('/login', async (request, reply) => {
        try{
            reply.status(200).send(await service.fazerLogin((request.body) as UsuarioLogin));
        } catch(e){
            console.error(e)
            reply.status(400).send({message: 'Erro ao realizar login!'})
        }
    });
}
