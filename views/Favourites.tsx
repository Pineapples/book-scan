import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ScrollView } from 'react-native';
import FavouritesListItem from '../components/FavouritesListItem';
import { Book } from '../models/Book.model';
import { getFavourites, removeFavourite } from '../services/favourites.repository';
import BookDetailsModal from '../components/BookDetailsModal';
import { NavigationProp } from '@react-navigation/native';

interface FavouritesProps {
    navigation: NavigationProp<any>;
}

export default function Favourites({ navigation }: FavouritesProps) {
    const [favourites, setFavourites] = useState<Book[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setFavourites(await getFavourites())
        });
        return unsubscribe;
    }, [navigation]);

    const closeModal = () => {
        setSelectedBook(null);
        setModalVisible(false);
    }

    const openDetails = (book: Book) => {
        setSelectedBook(book);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                animationType='slide'
                transparent={false}
                onRequestClose={() => closeModal()}>
                <BookDetailsModal book={selectedBook!} closeCallback={() => closeModal()} />
            </Modal>
            <ScrollView>
                {
                    favourites.length > 0 && favourites.map(favourite => (
                        <FavouritesListItem
                            key={favourite.isbn}
                            book={favourite}
                            deletePressedCallback={(book) => removeFavourite(book.isbn)}
                            detailsPressedCallback={(book) => openDetails(book)}
                        />))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})