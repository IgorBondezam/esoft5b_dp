import { prisma } from "../../resources/db/prisma-client";
import { Categoria, CategoriaCreate } from "../domain/interfaces/categoria.interface";

class CategoriaRepository{

    async findAll(): Promise<Categoria[]>{
        const categorias: Categoria[] =  await prisma.categoria.findMany();
        if(categorias.length == 0){
            throw new Error();
        }
        return categorias;
    }

    async findById(id: number): Promise<Categoria>{
        return await prisma.categoria.findUniqueOrThrow({
            where: {
                id: id,
            },
            select:{
                id: true,
                nome: true,
                cor: true,
            }
        });
    }

    async create(categoria: CategoriaCreate): Promise<Categoria>{
        const { nome, cor } = categoria
        return await prisma.categoria.create({
           data: {
                nome,
                cor,
           }    
        });
    }

    async update(id: number, categoria: CategoriaCreate): Promise<Categoria>{
        return await prisma.categoria.update({
            where:{id: id},
           data: {
                nome: categoria.nome,
                cor: categoria.cor,
           }    
        });
    }

    async delete(id: number): Promise<void>{
        await prisma.categoria.delete({
            where:{id: id}
        });
    }
}

export default new CategoriaRepository();