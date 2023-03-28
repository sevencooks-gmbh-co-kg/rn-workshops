import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated from 'react-native-reanimated'
import {} from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')

const CIRCLE_SIZE = width * 0.6
const PICKER_WIDTH = width - 64
const THUMB_SIZE = 32
const INNER_THUMB_SIZE = THUMB_SIZE / 2

const ColorPicker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.preview}></View>
      <View style={styles.picker}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    marginVertical: 8,
  },
})

export default ColorPicker

// NOT PART OF THE WORKSHOP. PLEASE DO NO CHANGE!

const clamp = (value: number, max: number) => {
  'worklet'
  return Math.min(Math.max(value, 0), max)
}
const multiply = (value: number, multi: number) => {
  'worklet'
  return clamp(Math.round(value * multi), multi)
}

const toRGB = (
  hue: number,
  sat: number,
  val: number,
): [r: number, g: number, b: number] => {
  'worklet'
  const h = hue / 360
  const s = sat / 100
  const v = val / 100

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  if (i % 6 === 0) return [multiply(v, 255), multiply(t, 255), multiply(p, 255)]
  if (i % 6 === 1) return [multiply(q, 255), multiply(v, 255), multiply(p, 255)]
  if (i % 6 === 2) return [multiply(p, 255), multiply(v, 255), multiply(t, 255)]
  if (i % 6 === 3) return [multiply(p, 255), multiply(q, 255), multiply(v, 255)]
  if (i % 6 === 4) return [multiply(t, 255), multiply(p, 255), multiply(v, 255)]
  if (i % 6 === 5) return [multiply(v, 255), multiply(p, 255), multiply(q, 255)]
  return [0, 0, 0]
}

const fromRGB = (
  red: number,
  green: number,
  blue: number,
): [h: number, s: number, v: number] => {
  'worklet'
  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  const s = max === 0 ? 0 : d / max
  const v = max

  if (max === min) return [0, multiply(s, 100), multiply(v, 100)]
  if (max === r) {
    const h = (g - b) / d + (g < b ? 6 : 0)
    return [multiply(h, 60), multiply(s, 100), multiply(v, 100)]
  }
  if (max === g) {
    const h = (b - r) / d + 2
    return [multiply(h, 60), multiply(s, 100), multiply(v, 100)]
  }
  if (max === b) {
    const h = (r - g) / d + 4
    return [multiply(h, 60), multiply(s, 100), multiply(v, 100)]
  }
  return [0, 0, 0]
}
