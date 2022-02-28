import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { getBook } from '../services/book.service';
import BookSummary from '../components/BookSummary';
import { Book } from '../models/Book.model';
import { addFavourite } from '../services/favourites.repository';
import { useIsFocused } from '@react-navigation/native';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean|null>(null);
  const [scanned, setScanned] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      console.log('Requesting permission');
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async (result: BarCodeEvent) => {
    setScanned(true);

    const book = await getBook(result.data);
    if(book) {
      setBook(book);
    } else {
      alert('Book not found.')
    }
  }

  const reset = () => {
    setScanned(false);
    setBook(null);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && !scanned && <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      /> }
      {book && <BookSummary book={book} saveCallback={(book) => addFavourite(book)} />}
      {scanned && <Button onPress={() => reset()} title={'Scan again'} />}
      <StatusBar></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
