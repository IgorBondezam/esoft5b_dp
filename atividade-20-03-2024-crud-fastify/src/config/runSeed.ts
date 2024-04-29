import { users as preInsertUsuario } from './users';
import { prisma } from "../../resources/db/prisma-client";

async function runSeed(): Promise<void> {
    try {
        await prisma.tarefa.deleteMany({})
        await prisma.usuario.deleteMany({})
        await prisma.categoria.deleteMany({})
        // await Promise.all(preInsertUsuario.map(i => {
        //     console.log('passei por ele')
        //     prisma.usuario.create({
        //         data: i
        //     })
        // }));
    } catch (error) {
        console.error('Cannot connect to database, error:', error);
    }
}

runSeed();

export { runSeed };
