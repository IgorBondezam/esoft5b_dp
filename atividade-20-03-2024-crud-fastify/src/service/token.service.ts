import jwt from 'jsonwebtoken';
import { Usuario } from '../domain/interfaces/usuario.interface';
import usuarioRepository from '../repository/usuario.repository';

class TokenService{
    constructor(){}


    createToken(userCreated: Usuario): string{
        return jwt.sign({id: userCreated.id, email: userCreated.email}, "teste-chave-jwt", {expiresIn: "1d"});
    }

    async verifyToken(token: string): Promise<Usuario>{
        const decode: any = jwt.verify(token, "teste-chave-jwt");
        return await usuarioRepository.findByEmail(decode.email);
         
    }
}

export default new TokenService;