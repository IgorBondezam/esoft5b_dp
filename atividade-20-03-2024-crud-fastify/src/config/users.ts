import {Usuario} from "@prisma/client";

const users: Usuario[] = [
    {
        id: 1,
        nome:'Felipe',
        peso: 78,
        email:'felipe@gmail.com.br',
        senha:'bbee578',
        createdAt: null,
        updatedAt: null
    },
    {
        id: 2,
        nome:'Bento',
        peso: 40,
        email:'bento@gmail.com.br',
        senha:'bbee578',
        createdAt: null,
        updatedAt: null
    },
    {
        id: 3,
        nome:'Zilda',
        peso: 60,
        email:'zilda@gmail.com.br',
        senha:'zzz345',
        createdAt: null,
        updatedAt: null
    }
]

export { users }