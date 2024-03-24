import fastify, { FastifyInstance } from 'fastify'
import { usuarioRoutes } from './controller/usuario.controller';

const app: FastifyInstance = fastify({logger: true});

app.register(usuarioRoutes, {
  prefix:'/usuario',
})


app.listen({
  port: 3000,
}, ()=> console.log("Server up"));


