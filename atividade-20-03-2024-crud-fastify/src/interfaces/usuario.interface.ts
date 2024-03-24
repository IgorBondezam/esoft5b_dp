export interface Usuario{
    id: number,
    nome: string,
    peso: number,
    email: string
}

export interface UsuarioCreate{
    id: number,
    nome: string,
    senha: string,
    peso: number,
    email: string
}