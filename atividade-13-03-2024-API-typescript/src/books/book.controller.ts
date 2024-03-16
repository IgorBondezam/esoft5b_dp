import { Request, Response } from 'express'
import service from './book.service'
import { NotFoundValueException } from "../exception/notFoundValueException"

class BookController {
    async create(req: Request, res: Response): Promise<void> {
        try{
            await service.create(req.body)
            res.status(201).json({ message: 'book created success' })
            return
        }catch(e){
            res.status(500).json({error3: 'Erro to create book. Error: ', e})
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try{
            const books = await service.findAll()
            res.status(200).json(books)
        }catch(e){
            if(e instanceof NotFoundValueException){
                res.status(204).json({error: e.message})
                return
            }
            res.status(500).json({error: 'Erro to find all books. Error: ', e})
        }
    }
    
    async findById(req: Request, res: Response): Promise<void> {
        try{
            const book = await service.findById(req.params.id)
            res.status(200).json(book)
        }catch(e){
            if(e instanceof NotFoundValueException){
                res.status(204).json({error: e.message})
                return
            }
            res.status(500).json({error: 'Erro to find book by book. Error: ', e})
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try{
            await service.update(req.params.id, req.body)
            res.status(200).json({ message: 'book updated success' })
            return
        }catch(e){
            if(e instanceof NotFoundValueException){
                res.status(204).json({message: e.message})
                return
            }
            res.status(500).json({error: 'Erro to update book. Error: ', e})
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try{
            await service.delete(req.params.id)
            res.status(204).json({ message: 'book deleted success' })
        }catch(e: any){
            if(e.name == "CastError"){
                res.status(400).json({error: 'Wrong type cast from param, Error: ', e})
                return
            }
            res.status(500).json({error: 'Erro to delete book. Error: ', e})
        }
    }
}

export default new BookController()