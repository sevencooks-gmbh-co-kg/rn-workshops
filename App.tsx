import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Switch from './src/Switch/Switch'

export default function App() {
  const [checked, setChecked] = React.useState(false)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Switch checked={checked} onChange={setChecked} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
