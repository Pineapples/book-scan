import { Book, GoogleBookResponse } from "../models/Book.model";

export async function getBook(isbn: string): Promise<Book | null> {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`);
        const books: GoogleBookResponse = await response.json();
        if(books.items && books.items.length > 0) {
            const book = books.items[0];

            return {
                authors: book.volumeInfo.authors.join(', '),
                title: book.volumeInfo.title,
                isbn: book.volumeInfo.industryIdentifiers.find(d => d.type === 'ISBN_13')?.identifier || '',
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description,
                thumbnail: book.volumeInfo.imageLinks?.thumbnail
            }
        }
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }   
}