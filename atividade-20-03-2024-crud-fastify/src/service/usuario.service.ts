import { Usuario, UsuarioCreate, UsuarioLogin } from "../domain/interfaces/usuario.interface";
import UsuarioRespository from "../repository/usuario.repository";
import tokenService from "./token.service";

class UsuarioService{
    private repository = UsuarioRespository;
    constructor(){}

    async findAll(): Promise<Usuario[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Usuario>{
        return await this.repository.findById(id);
    }

    async create(usuario: UsuarioCreate): Promise<Usuario>{
        const emailJaUtilizado = await this.repository.findByEmail(usuario.email);
        if(!!emailJaUtilizado){
            throw new Error('Email já utilizado!');
        }
        return await this.repository.create(usuario);
    }

    async update(id: number, usuario: UsuarioCreate): Promise<Usuario>{
        return await this.repository.update(id, usuario);
    }

    async delete(id: number): Promise<void>{
        await this.repository.delete(id); 
    }

    async fazerLogin(login: UsuarioLogin): Promise<Usuario>{
        const usuario = await this.repository.fazerLogin(login);
        const token = tokenService.createToken(usuario);
        usuario.token = token;

        return usuario;
    }
}

export default new UsuarioService();