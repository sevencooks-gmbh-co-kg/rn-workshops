import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Alert, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Component from './src/Component'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <Component
        onPressFilm={film => {
          Alert.alert(film.title, film.openingCrawl)
        }}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
