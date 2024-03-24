import { Usuario, UsuarioCreate, UsuarioLogin } from "../domain/interfaces/usuario.interface";
import { prisma } from "../../resources/db/prisma-client";

class UsuarioRespository{

    async findAll(): Promise<Usuario[]>{
        return await prisma.usuario.findMany();
    }

    async findById(id: number): Promise<Usuario>{
        return await prisma.usuario.findUniqueOrThrow({
            where: {
                id: id,
            },
            select:{
                id: true,
                nome: true,
                peso: true,
                email: true,
            }
        });
    }

    async create(usuario: UsuarioCreate): Promise<void>{
        const { id, nome, senha, peso, email } = usuario
        await prisma.usuario.create({
           data: {
                id,
                nome,
                senha,
                peso,
                email,
           }    
        });
    }

    async update(id: number, usuario: UsuarioCreate): Promise<void>{
        await prisma.usuario.update({
            where:{id: id},
           data: {
                nome: usuario.nome,
                senha: usuario.senha,
                peso: usuario.peso,
                email: usuario.email,
           }    
        });
    }

    async delete(id: number): Promise<void>{
        await prisma.usuario.delete({
            where:{id: id}
        });
    }

    async fazerLogin(login: UsuarioLogin): Promise<Usuario> {
        return await prisma.usuario.findUniqueOrThrow({
            where: {
                email: login.email,
                senha: login.senha
            },
            select:{
                id: true,
                nome: true,
                peso: true,
                email: true,
            }
        });    }
}

export default new UsuarioRespository();