import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Button(props: any) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.button}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    button: {
        padding: 15,
        backgroundColor: 'blue'
    }
})