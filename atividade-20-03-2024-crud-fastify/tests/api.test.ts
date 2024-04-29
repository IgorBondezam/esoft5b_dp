import {deepStrictEqual} from 'node:assert'
import {runSeed} from '../src/config/runSeed'
import {FastifyInstance} from "fastify";
import {prisma} from "../resources/db/prisma-client";
import {Categoria, Status} from "@prisma/client";
import {Tarefa} from "../src/domain/interfaces/tarefa.interface";
import {UsuarioCreate} from "../src/domain/interfaces/usuario.interface";
import {CategoriaCreate} from "../src/domain/interfaces/categoria.interface";
import exp from "constants";

describe('API (Usuarios, Tarefas, Categorias) Workflow', () => {
    let _testServer: FastifyInstance
    let _testServerAddress: string

    function createUsuario(Usuario: UsuarioCreate) {
        return _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/usuario`,
            payload: Usuario,
        })
    }

    async function usuarioGetAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/usuario`,
        })
    }

    async function usuarioGetById(Id: any) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/usuario/${Id}`,
            payload: Id,
        })
    }

    async function usuarioUpdate(Id: string, Body: any) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/usuario/${Id}`,
            payload: Body
        })
    }

    async function usuarioDelete(id: number) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/usuario/${id}`
        })
    }

    beforeAll(async () => {
        const { app } = await import('../src/app');
        _testServer = app;
        _testServerAddress = 'http://localhost:3000';
    })

    beforeEach(async () => {
        await runSeed();
    })

    afterAll(async () => {
        await prisma.categoria.deleteMany({});
        await prisma.tarefa.deleteMany({});
        await prisma.usuario.deleteMany({});
        if (_testServer) {
            await _testServer.close();
        }
    })

    describe('POST /usuario', () => {
        it('Deve criar um usuario', async () => {
            const input: UsuarioCreate = {
                nome: 'Jose',
                peso: 10,
                email: 'jose32@gmail.com.br',
                senha: 'jose12'
            }

            const returno = await createUsuario(input);
            const body = JSON.parse(returno.body);
            const statusCode = returno.statusCode;

            deepStrictEqual(statusCode, 201);
            expect(body.id).not.toBeNull( );
            deepStrictEqual(input.nome, body.nome);
            deepStrictEqual(input.peso, body.peso);
            deepStrictEqual(input.email, body.email);
        })
    });

    describe(`GET /usuario`, () => {
        it('Deve trazer todos os usuários cadastrados', async () => {
            const usuarios2: UsuarioCreate[] = [
                {
                    nome: 'Joao Palo',
                    peso: 56,
                    email: 'joao@gmail.com.br',
                    senha: 'jjoao1'
                },
                {
                    nome: 'Maurilio',
                    peso: 80,
                    email: 'maurilio@gmail.com.br',
                    senha: 'Maumau'
                },
                {
                    nome: 'Cassiano',
                    peso: 70,
                    email: 'cassiano@gmail.com.br',
                    senha: 'leiteP'
                }
            ]
            await Promise.all(
                usuarios2.map(async usuario => await createUsuario(usuario))
            );

            const reply = await usuarioGetAll();
            const lista = JSON.parse(reply.body);
            deepStrictEqual(reply.statusCode, 200)
            deepStrictEqual(lista.length, 3);
        })
    })

    describe(`GET /usuario/:id`, () => {
        it(`Deve trazer um usuário pelo id`, async () => {
            const usuarioNew = {
                nome: 'Espeto',
                peso: 60,
                email: 'espeto@gmail.com.br',
                senha: 'espeto'
            }

            const resultado = await createUsuario(usuarioNew)
            const resultadoBody = JSON.parse(resultado.body);
            const usuario = await usuarioGetById(resultadoBody.id);
            const usuarioBody = JSON.parse(usuario.body);
            const expectedId = usuarioBody.id;
            const statusCode = usuario.statusCode;
            deepStrictEqual(statusCode, 200);
            deepStrictEqual(resultadoBody.id, expectedId);
            deepStrictEqual(resultadoBody.nome, 'Espeto');
            deepStrictEqual(resultadoBody.email, 'espeto@gmail.com.br');
        })
    })

    describe(`PUT /usuario/:id`, () => {
        it(`Deve atualizar um usuário existente`, async () => {
            const usuarioNew = {
                nome: 'Talita',
                peso: 45,
                email: 'talita@gmail.com.br',
                senha: 'tata99'
            }

            const resultado = await createUsuario(usuarioNew)
            const resultadoBody = JSON.parse(resultado.body);
            const usuario = await usuarioGetById(resultadoBody.id);
            const usuarioBody = JSON.parse(usuario.body)
            const realId = usuarioBody.id;

            const usuarioUpdat = {
                nome: 'Talita Da Silva',
                peso: 50,
                email: 'talita@gmail.com.br',
                senha: 'tata99'
            }

            const updateNow = await usuarioUpdate(realId, usuarioUpdat);
            const resultadoBodyUP = JSON.parse(updateNow.body);
            const usuarioUP = await usuarioGetById(resultadoBodyUP.id);
            const usuarioBodyUP = JSON.parse(usuarioUP.body);

            const obj = {
                nome: usuarioBodyUP.nome,
                peso: usuarioBodyUP.peso,
                email: usuarioBodyUP.email,
            }
            const statusCode = updateNow.statusCode;
            deepStrictEqual(resultadoBody.id, usuarioBodyUP.id);
            deepStrictEqual(usuarioUpdat.nome, obj.nome);
            deepStrictEqual(usuarioUpdat.peso, obj.peso);
            deepStrictEqual(usuarioUpdat.email, obj.email);
            deepStrictEqual(statusCode, 200);

        })
    })

    describe(`DELETE /usuario/:id`, () => {
        it(`Deve deletar um usuário pelo id`, async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }

            const resultado = await createUsuario(usuarioNew)
            const resultadoBody = JSON.parse(resultado.body);
            const usuario = await usuarioGetById(resultadoBody.id);
            const usuarioBody = JSON.parse(usuario.body)

            const response = await usuarioDelete(usuarioBody.id);
            deepStrictEqual(response.statusCode, 204);
        })
    })

    // TASKS

    function createTarefa(tarefa: Tarefa) {
        return _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/tarefa`,
            payload: tarefa,
        })
    }

    async function tarefaGetAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/tarefa`,
        })
    }

    async function tarefaGetById(id: number) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/tarefa/${id}`,
        })
    }

    async function tarefaUpdate(id: number, body: Tarefa) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/tarefa/${id}`,
            payload: body
        })
    }

    async function tarefaDelete(id: number) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/tarefa/${id}`,
            payload: id.toString()
        })
    }


    describe('POST /tarefa', () => {
        it('Deve Criar uma tarefa', async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }
            const resultado = await createUsuario(usuarioNew);
            const resultadoBody = JSON.parse(resultado.body);

            const input: Tarefa =  {
                    id: 1,
                    titulo: 'Jogar Volei',
                    descricao: 'Treinar para partida de volei',
                    tipo: 'volei',
                    status: Status.PENDENTE,
                    categoriaId: null,
                    usuarioId: resultadoBody.id
                }

            const tarefaBody = await createTarefa(input);
            const tarefaReturn: Tarefa = JSON.parse(tarefaBody.body);

            deepStrictEqual(tarefaBody.statusCode, 201);
            deepStrictEqual(tarefaReturn.titulo, input.titulo )
            deepStrictEqual(tarefaReturn.descricao, input.descricao )
            deepStrictEqual(tarefaReturn.tipo, input.tipo )
            deepStrictEqual(tarefaReturn.status, input.status )
            deepStrictEqual(tarefaReturn.categoriaId, input.categoriaId )
            deepStrictEqual(tarefaReturn.usuarioId, input.usuarioId )
        })
    });

    describe(`GET /tarefa`, () => {
        it('Deve trazer todas as tarefas', async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }
            const resultado = await createUsuario(usuarioNew)
            const resultadoBody = JSON.parse(resultado.body);
            const tarefas2: Tarefa[] = [
                {
                    id: 1,
                    titulo: 'Jogar Volei',
                    descricao: 'Treinar para partida de volei',
                    tipo: 'volei',
                    status: Status.PENDENTE,
                    categoriaId: null,
                    usuarioId: resultadoBody.id
                },
                {
                    id: 2,
                    titulo: 'Jogar Basquete',
                    descricao: 'Treinar para partida de basquete',
                    tipo: 'basquete',
                    status: Status.EM_ANDAMENTO,
                    categoriaId: null,
                    usuarioId: resultadoBody.id
                },
                {
                    id: 3,
                    titulo: 'Jogar Futebol',
                    descricao: 'Treinar para partida de futebol',
                    tipo: 'futebol',
                    status: Status.CONCLUIDO,
                    categoriaId: null,
                    usuarioId: resultadoBody.id
                }
            ]

            const tarefasRetorno: Tarefa[] = [];
            const tarefasResponses = async () =>{ await Promise.all(
                tarefas2.map(async tarefa => {
                    const tarefaReturn = await createTarefa(tarefa);
                    tarefasRetorno.push(JSON.parse(tarefaReturn.body))
                })
            )};
            await  tarefasResponses();
            const reply = await tarefaGetAll();
            const json = JSON.parse(reply.body);
            const tarefaDetailsSorted: Tarefa[] = tarefasRetorno.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);
            const jsonSorted = json.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);

            const statusCode = reply.statusCode;
            deepStrictEqual(statusCode, 200);
            deepStrictEqual(json.length, 3);
            deepStrictEqual(tarefaDetailsSorted[0].id, jsonSorted[0].id);
            deepStrictEqual(tarefaDetailsSorted[0].titulo, jsonSorted[0].titulo);
            deepStrictEqual(tarefaDetailsSorted[0].descricao, jsonSorted[0].descricao);
            deepStrictEqual(tarefaDetailsSorted[0].tipo, jsonSorted[0].tipo);
            deepStrictEqual(tarefaDetailsSorted[0].status, jsonSorted[0].status);
        })
    })

    describe(`GET /tarefa/:id`, () => {
        it(`Trazer uma tarefa pelo id tarefa`, async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }
            const resultadoUser = await createUsuario(usuarioNew)
            const resultadoUserBody = JSON.parse(resultadoUser.body);

            const tarefaNew: Tarefa = {
                id: 1,
                titulo: 'Jogar Volei',
                descricao: 'Treinar para partida de volei',
                tipo: 'volei',
                status: 'PENDENTE',
                categoriaId: null,
                usuarioId: resultadoUserBody.id
            }

            const resultado = await createTarefa(tarefaNew)
            const resultadoBody: Tarefa = JSON.parse(resultado.body);
            const tarefa = await tarefaGetById(resultadoBody.id);
            const tarefaBody = JSON.parse(tarefa.body);

            deepStrictEqual(tarefa.statusCode, 200);
            expect(resultadoBody.id).not.toEqual(null);
            deepStrictEqual(resultadoBody.id, tarefaBody.id);
            deepStrictEqual(resultadoBody.descricao, tarefaBody.descricao);
            deepStrictEqual(resultadoBody.categoriaId, tarefaBody.categoriaId);
            deepStrictEqual(resultadoBody.usuarioId, tarefaBody.usuarioId);
        })
    })

    describe(`PUT /tarefa/:id`, () => {
        it(`Deve atualizar uma tarefa`, async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }
            const resultado = await createUsuario(usuarioNew)
            const resultadoBody = JSON.parse(resultado.body);

            const input: Tarefa = {
                id: 1,
                titulo: 'Jogador de Volei',
                descricao: 'Treinar para partida de volei',
                tipo: 'volei',
                status: 'PENDENTE',
                categoriaId: null,
                usuarioId: resultadoBody.id
            }

            const tarefaBody: Tarefa = JSON.parse((await createTarefa(input)).body);

            const tarefaUpdateValue: Tarefa = {
                id: tarefaBody.id,
                titulo: 'Jogador de Baseboll',
                descricao: 'Treinar para partida de Baseboll',
                tipo: 'basebol',
                status: 'CONCLUIDO',
                categoriaId: null,
                usuarioId: 1
            }

            const updateNow = await tarefaUpdate(tarefaBody.id, tarefaUpdateValue);
            const resultadoBodyUP: Tarefa = JSON.parse(updateNow.body);
            const tarefaUP = await tarefaGetById(resultadoBodyUP.id);
            const tarefaBodyUP = JSON.parse(tarefaUP.body);

            deepStrictEqual(tarefaBody.id, tarefaBodyUP.id);
            deepStrictEqual(tarefaBody.usuarioId, tarefaBodyUP.usuarioId);
            expect(tarefaBodyUP.titulo).toEqual('Jogador de Baseboll')
            expect(tarefaBodyUP.descricao).toEqual('Treinar para partida de Baseboll')
            expect(tarefaBodyUP.status).toEqual(Status.CONCLUIDO);
            deepStrictEqual(updateNow.statusCode, 200);

        })
    })

    describe(`DELETE /tarefa/;id`, () => {
        it(`Deve deletar uma tarefa tarefa`, async () => {
            const usuarioNew = {
                id: 1,
                nome: 'Ronaldinho Gaucho',
                peso: 80,
                email: 'ronaldinho@gmail.com.br',
                senha: 'r10r10'
            }
            const resultadoUser = await createUsuario(usuarioNew)
            const resultadoUserBody = JSON.parse(resultadoUser.body);

            const input: Tarefa = {
                id: 1,
                titulo: 'Jogador de Volei',
                descricao: 'Treinar para partida de volei',
                tipo: 'volei',
                status: 'PENDENTE',
                categoriaId: null,
                usuarioId: resultadoUserBody.id
            }

            const resultado = await createTarefa(input)
            const resultadoBody: Tarefa = JSON.parse(resultado.body);
            const tarefa = await tarefaGetById(resultadoBody.id);
            const tarefaBody = JSON.parse(tarefa.body)
            const realId: number = tarefaBody.id;

            const response = await tarefaDelete(realId);
            deepStrictEqual(response.statusCode, 204);
        })
    })

    // CATEGORY

    function createCategoria(Tarefa: any) {
        return _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/categoria`,
            payload: Tarefa,
        })
    }

    async function categoriaGetAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/categoria`,
        })
    }

    async function categoriaGetById(Id: any) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/categoria/${Id}`,
            payload: Id,
        })
    }

    async function categoriaUpdate(Id: string, Body: any) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/categoria/${Id}`,
            payload: Body
        })
    }

    async function categoriaDelete(Id: String) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/categoria/${Id}`,
            payload: Id
        })
    }


    describe('POST /categoria', () => {
        it('Deve criar uma categoria', async () => {
            const categoria: CategoriaCreate = {
                nome: 'Esporte',
                cor: 'white'
            }

            const retorno = await createCategoria(categoria);
            const retornoBody: Categoria = JSON.parse(retorno.body);

            deepStrictEqual(retorno.statusCode, 201);
            expect(retornoBody.id).not.toBeNull();
            deepStrictEqual(retornoBody.cor, 'white');
            deepStrictEqual(retornoBody.nome, 'Esporte');
        })
    });

    describe(`GET /categoria`, () => {
        it('Deve trazer todas as categorias', async () => {
            const categoria2: CategoriaCreate[] = [
                {
                    nome: 'Fabrica',
                    cor: 'green'
                },
                {
                    nome: 'Estudar',
                    cor: 'black'
                },
                {
                    nome: 'Casa',
                    cor: 'blue'
                }
            ]

            const lista: Categoria[] = []
            const categoriaResponses = async () => Promise.all(
                categoria2.map(async categoria => {
                    const create = await createCategoria(categoria)
                    lista.push(JSON.parse(create.body));
                })
            );
            await categoriaResponses();
            const reply = await categoriaGetAll();
            const json = JSON.parse(reply.body);
            const categoriaDetailsSorted = lista.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);
            const categoriaSorted = json.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);

            const statusCode = reply.statusCode;
            deepStrictEqual(statusCode, 200)
            deepStrictEqual(categoriaSorted.length, 3);
            deepStrictEqual(categoriaSorted[0].id, categoriaDetailsSorted[0].id);
            deepStrictEqual(categoriaSorted[0].nome, categoriaDetailsSorted[0].nome);
            deepStrictEqual(categoriaSorted[0].cor, categoriaDetailsSorted[0].cor);
        })
    })

    describe(`GET /categoria/:id`, () => {
        it(`Deve trazer uma categoria por id`, async () => {
            const categoriaNew: CategoriaCreate = {
                nome: 'Esporte',
                cor: 'white'
            }

            const resultado = await createCategoria(categoriaNew);
            const resultadoBody = JSON.parse(resultado.body);

            const categoria = await categoriaGetById(resultadoBody.id);
            const categoriaBody = JSON.parse(categoria.body);
            const statusCode = categoria.statusCode;

            deepStrictEqual(statusCode, 200);
            deepStrictEqual(resultadoBody.id, categoriaBody.id);
            deepStrictEqual(resultadoBody.cor, categoriaBody.cor);
            deepStrictEqual(resultadoBody.nome, categoriaBody.nome);
        })
    })

    describe(`PUT /categoria/:id`, () => {
        it(`Deve atualizar uma categoria`, async () => {
            const categoria: CategoriaCreate = {
                nome: 'Esporte',
                cor: 'white'
            }

            const resultado = await createCategoria(categoria);
            const resultadoBody = JSON.parse(resultado.body);
            const categoriaUpdat = {
                nome: 'Esporte',
                cor: 'orange'
            }

            const updateNow = await categoriaUpdate(resultadoBody.id, categoriaUpdat);
            const resultadoBodyUP = JSON.parse(updateNow.body);

            const categoriaUP = await categoriaGetById(resultadoBody.id);
            const categoriaBodyUP = JSON.parse(categoriaUP.body);

            const obj = {
                nome: categoriaBodyUP.nome,
                cor: categoriaBodyUP.cor
            }

            const statusCode = updateNow.statusCode;
            deepStrictEqual(resultadoBodyUP.cor, obj.cor);
            expect(obj.cor).not.toEqual(categoria.cor);
            deepStrictEqual(resultadoBodyUP.nome, obj.nome);
            deepStrictEqual(statusCode, 200);
        })
    })

    describe(`DELETE /categoria/:id`, () => {
        it(`Deve deletar uma categoria`, async () => {
            const input: CategoriaCreate = {
                nome: 'Esporte',
                cor: 'white'
            }

            const resultado = await createCategoria(input);
            const resultadoBody = JSON.parse(resultado.body);

            const response = await categoriaDelete(resultadoBody.id);
            deepStrictEqual(response.statusCode, 204);
        })
    })
});