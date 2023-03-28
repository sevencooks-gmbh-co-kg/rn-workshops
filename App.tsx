import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Alert, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ColorPicker from './src/ColorPicker/ColorPicker'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <ColorPicker
        onChange={color => {
          Alert.alert('New color selected', `You color is: ${color}`)
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
