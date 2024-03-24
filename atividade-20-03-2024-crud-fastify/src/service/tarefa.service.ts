import { Tarefa } from "../domain/interfaces/tarefa.interface";
import TarefaRepository from "../repository/tarefa.repository";

class UsuarioService{
    private repository = TarefaRepository;
    constructor(){}

    async findAll(): Promise<Tarefa[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Tarefa>{
        return await this.repository.findById(id);
    }

    async create(tarefa: Tarefa): Promise<void>{
        await this.repository.create(tarefa); 
    }

    async update(id: number, tarefa: Tarefa): Promise<void>{
        await this.repository.update(id, tarefa); 
    }

    async delete(id: number): Promise<void>{
        await this.repository.delete(id); 
    }
}

export default new UsuarioService();