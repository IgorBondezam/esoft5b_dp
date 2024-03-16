import { Schema, model } from 'mongoose'
import { Book } from './book'

const bookSchema = new Schema<Book>({
    title: String,
    author: String,
    ISBN: String,
    pageNumber: Number
}, {
    timestamps: true
})

export default model('Books', bookSchema)
