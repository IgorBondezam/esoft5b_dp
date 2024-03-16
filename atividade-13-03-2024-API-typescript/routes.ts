import { Router } from 'express'
import bookController from './src/books/book.controller'

const routes = Router()
routes.get('/health-check')
routes.post('/books', bookController.create)
routes.get('/books', bookController.findAll)
routes.get('/book/:id', bookController.findById)
routes.put('/updade/:id', bookController.update)
routes.delete('/delete/:id', bookController.delete)

export { routes }