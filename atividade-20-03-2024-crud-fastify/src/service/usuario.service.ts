import { Usuario, UsuarioCreate, UsuarioLogin } from "../domain/interfaces/usuario.interface";
import UsuarioRespository from "../repository/usuario.repository";

class UsuarioService{
    private repository = UsuarioRespository;
    constructor(){}

    async findAll(): Promise<Usuario[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Usuario>{
        return await this.repository.findById(id);
    }

    async create(usuario: UsuarioCreate): Promise<void>{
        await this.repository.create(usuario); 
    }

    async update(id: number, usuario: UsuarioCreate): Promise<void>{
        await this.repository.update(id, usuario); 
    }

    async delete(id: number): Promise<void>{
        await this.repository.delete(id); 
    }

    async fazerLogin(login: UsuarioLogin): Promise<Usuario>{
        return await this.repository.fazerLogin(login);
    }
}

export default new UsuarioService();