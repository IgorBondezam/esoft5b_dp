import { Categoria, CategoriaCreate } from "../domain/interfaces/categoria.interface";
import CategoriaRepository from "../repository/categoria.repository";

class UsuarioService{
    private repository = CategoriaRepository;
    constructor(){}

    async findAll(): Promise<Categoria[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Categoria>{
        return await this.repository.findById(id);
    }

    async create(categoria: CategoriaCreate): Promise<void>{
        await this.repository.create(categoria); 
    }

    async update(id: number, categoria: CategoriaCreate): Promise<void>{
        await this.repository.update(id, categoria); 
    }

    async delete(id: number): Promise<void>{
        await this.repository.delete(id); 
    }
}

export default new UsuarioService();