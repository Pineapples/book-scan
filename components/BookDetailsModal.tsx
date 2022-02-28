import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Book } from '../models/Book.model';

interface BookDetailsModalProps {
    book: Book;
    closeCallback: () => void;
}

function KeyValue(props: {title: string, value: string}) {
    const {title, value} = props;
    return (
        <View style={styles.keyValuePair}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

export default function BookDetailsModal(props: BookDetailsModalProps) {
    const {book, closeCallback} = props;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Details</Text>
                    <Pressable style={styles.closePressable} onPress={() => closeCallback()}>
                        <Text style={styles.closeText}>❌</Text>
                    </Pressable>
                </View>
                {book.thumbnail && <Image style={styles.thumbnail} source={{uri: book.thumbnail}} />}
                <KeyValue title='Title' value={book.title} />
                <KeyValue title='Author' value={book.authors} />
                {book.description && <KeyValue title='Description' value={book.description} />}
                <KeyValue title='Publish date' value={book.publishedDate} />
                <KeyValue title='ISBN' value={book.isbn} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 10
    },
    keyValuePair: {
        marginBottom: 10
    },
    container: {
        marginTop: 20,
        padding: 20
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 12
    },
    closePressable: {
        padding: 15,
    },
    closeText: {
        color: 'blue',
        fontSize: 20
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
})