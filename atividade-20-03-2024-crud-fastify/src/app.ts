import fastify, { FastifyInstance } from 'fastify'
import { usuarioRoutes } from './controller/usuario.controller';
import { categoriaRoutes } from './controller/categoria.controller';
import { tarefaRoutes } from './controller/tarefa.controller';

const app: FastifyInstance = fastify({logger: true});

app.register(usuarioRoutes, {
  prefix:'/usuario',
})

app.register(categoriaRoutes, {
  prefix:'/categoria',
})

app.register(tarefaRoutes, {
  prefix:'/tarefa',
})



app.listen({
  port: 3000,
}, ()=> console.log("Server up"));


