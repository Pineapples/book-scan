export interface GoogleBookResponse {
    items: {
        volumeInfo: {
            title: string;
            authors: string[];
            industryIdentifiers: {
                type: string;
                identifier: string;
            }[],
            publishedDate: string;
            description: string;
            imageLinks: {
                thumbnail: string;
            }
        }
    }[]
}

export interface Book {
    title: string;
    authors: string;
    isbn: string;
    thumbnail?: string;
    publishedDate: string;
    description?: string;
}