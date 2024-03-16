import {Book} from './book';
import bookModel from './book.schema'
import {NotFoundValueException} from "../exception/notFoundValueException"


class BookService {
    async create(book: any): Promise<void> {
        await bookModel.create(book)
    }

    async findAll(): Promise<Book[]> {
        const books : Book[] = await bookModel.find() as Book[];
        this._isEmptyReturnBooks(books);
        return books;
    }

    async findById(id: string): Promise<Book> {
        const book: Book = await bookModel.findById(id) as Book;
        this._isNullReturnBooks(book);
        return book;
    }

    async update(id: string, book: any): Promise<void> {
        await this.findById(id);
        bookModel.findByIdAndUpdate(id, book);
    }

    async delete(id: string): Promise<void> {
        bookModel.findByIdAndDelete(id);
    }

    private _isNullReturnBooks(book: Book): void{
        if(!book){
            throw new NotFoundValueException("Not found any value!")
        }
    }

    private _isEmptyReturnBooks(books: Book[]): void{
        if(books.length == 0){
            throw new NotFoundValueException("Not found any value!")
        }
    }
}

export default new BookService
