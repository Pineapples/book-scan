import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Book } from '../models/Book.model';

interface BookSummaryProps {
    book: Book;
    saveCallback: (book: Book) => void;
}

export default function BookSummary(props: BookSummaryProps) {
    const { thumbnail, title, authors, isbn } = props.book;

    return (
        <View style={styles.container}>
            {thumbnail && <Image style={styles.cover} source={{uri: thumbnail}}></Image>}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{authors}</Text>
            <Text style={styles.subTitle}>{isbn}</Text>
            <Button title={'Save in favourites'} onPress={() => props.saveCallback(props.book)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    cover: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 10
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'center'
    }
})