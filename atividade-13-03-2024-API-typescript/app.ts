import mongoose from 'mongoose'
import { routes } from './routes'
import express from 'express';


class App {
    public expres: express.Application

    public constructor() {
        this.expres = express()
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware(): void {
        this.expres.use(express.json())
    }

    private async database(): Promise<void> {
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect('mongodb://0.0.0.0:27017/esoft5s-books')
            console.log('Connect database success')
        } catch (error) {
            console.error('Cannot connect to database, error:', error)
        }
    }

    private routes(): void {
        this.expres.use(routes)
    }
}

export default new App().expres