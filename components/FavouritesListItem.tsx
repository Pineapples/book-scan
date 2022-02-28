import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Book } from '../models/Book.model';

interface FavouritesProps {
    book: Book;
    deletePressedCallback: (book: Book) => void;
    detailsPressedCallback: (book: Book) => void;
}

export default function FavouritesListItem(props: FavouritesProps) {
    const { book, deletePressedCallback, detailsPressedCallback } = props;

    return (
        <View style={styles.listItemContainer}>
            <Pressable onPress={() => detailsPressedCallback(book)}>
                <View>

                    <Text style={styles.listItemTitle}>{book.title}</Text>
                    <Text style={styles.listItemAuthor}>{book.authors}</Text>
                </View>
            </Pressable>
            <TouchableOpacity onPress={() => deletePressedCallback(book)}>
                <Text style={{fontSize: 16}}>🗑️</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    listItemAuthor: {
        fontSize: 12
    },
    listItemContainer: {
        padding: 8,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    listItemIcon: {
        marginRight: 10,
        fontSize: 20
    }
})