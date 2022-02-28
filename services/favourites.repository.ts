import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../models/Book.model';
import { Constants } from '../models/Constants.model';

export async function getFavourites() {
    console.log('getFavourites called');

    const getItemResult = await AsyncStorage.getItem(Constants.FAVOURITES_KEY);
    const currentFavourites: Book[] = getItemResult != null ? JSON.parse(getItemResult) : [];
    return currentFavourites;
}

export async function setFavourites(favourites: Book[]) {
    console.log('setFavourites called');

    await AsyncStorage.setItem(Constants.FAVOURITES_KEY, JSON.stringify(favourites));
}

export async function clearFavourites() {
    console.log('clearFavourites called');

    await AsyncStorage.removeItem(Constants.FAVOURITES_KEY);
}

export async function removeFavourite(isbn: string) {
    console.log('removeFavourites called');

    const favourites = await getFavourites();
    const bookIndex = favourites.findIndex(d => d.isbn === isbn);
    favourites.splice(bookIndex, 1);
    await setFavourites(favourites);
}

export async function addFavourite(book: Book) {
    console.log('addFavourite called');

    const favourites = await getFavourites();

    if(favourites.find(d => d.isbn === book.isbn)) {
        return;
    }

    favourites.push(book);
    await setFavourites(favourites);
}