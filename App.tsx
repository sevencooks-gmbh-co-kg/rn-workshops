import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Component from './src/Component'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <Component />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
