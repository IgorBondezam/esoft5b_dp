import { Usuario } from "../domain/interfaces/usuario.interface";
import tokenService from "../service/token.service";

export const rotaAutenticada = {preHandler: async (request: any, reply: any, done: any) => {
    if(process.env?.NODE_ENV == 'test'){
        await done();
        return;
    }
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if(!token){
        reply.status(401).send({message: "Acesso não autorizado!"});
    }

    const usuarioFromToken: Usuario = await tokenService.verifyToken(token);
    if(!usuarioFromToken){
        reply.status(404).send({message: "Usuário não encontrado!"});
    }
    await done();
}};