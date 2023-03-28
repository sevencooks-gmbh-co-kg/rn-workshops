import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')

const CIRCLE_SIZE = width * 0.6
const PICKER_WIDTH = width - 64
const THUMB_SIZE = 32
const INNER_THUMB_SIZE = THUMB_SIZE / 2

interface ColorPickerInterface {
  onChange?: (color: string) => void
}
const ColorPicker = ({ onChange }: ColorPickerInterface) => {
  // #FF0000
  const hue = useSharedValue(0)
  const sat = useSharedValue(100)
  const val = useSharedValue(100)

  const satValProgress = useSharedValue(0)
  const hueProgress = useSharedValue(0)

  const animatedCircleStyle = useAnimatedStyle(() => {
    const [r, g, b] = toRGB(hue.value, sat.value, val.value)
    return {
      backgroundColor: `rgb(${r},${g},${b})`,
    }
  })

  const animatedSatValStyle = useAnimatedStyle(() => {
    const [r, g, b] = toRGB(hue.value, 100, 100)
    return {
      backgroundColor: `rgb(${r},${g},${b})`,
    }
  })
  const animatedSatValThumbStyle = useAnimatedStyle(() => {
    const [r, g, b] = toRGB(hue.value, sat.value, val.value)
    return {
      backgroundColor: `rgb(${r},${g},${b})`,
      transform: [
        {
          translateX: clamp(
            PICKER_WIDTH * (sat.value / 100) - THUMB_SIZE / 2,
            PICKER_WIDTH - THUMB_SIZE,
          ),
        },
        {
          translateY: clamp(
            PICKER_WIDTH - PICKER_WIDTH * (val.value / 100) - THUMB_SIZE / 2,
            PICKER_WIDTH - THUMB_SIZE,
          ),
        },
        { scale: interpolate(satValProgress.value, [0, 0.5, 1], [1, 1.5, 1]) },
      ],
    }
  })
  const animatedHueThumbStyle = useAnimatedStyle(() => {
    const [r, g, b] = toRGB(hue.value, 100, 100)
    return {
      backgroundColor: `rgb(${r},${g},${b})`,
      transform: [
        {
          translateX: clamp(
            (PICKER_WIDTH / 360) * hue.value - THUMB_SIZE / 2,
            PICKER_WIDTH - THUMB_SIZE,
          ),
        },
        { scale: interpolate(hueProgress.value, [0, 0.5, 1], [1, 1.5, 1]) },
      ],
    }
  })

  const satValPanGesture = Gesture.Pan()
    .onUpdate(({ x, y }) => {
      const posX = clamp(x, PICKER_WIDTH)
      const posY = PICKER_WIDTH - clamp(y, PICKER_WIDTH)
      const newSat = Math.round((posX / PICKER_WIDTH) * 100)
      const newVal = Math.round((posY / PICKER_WIDTH) * 100)

      sat.value = newSat
      val.value = newVal
    })
    .onEnd(() => {
      if (typeof onChange === 'function') {
        const color = toRGB(hue.value, sat.value, val.value)
        runOnJS(onChange)(`rgb(${color.join(',')})`)
      }
    })
  const satValTapGesture = Gesture.Tap().onStart(({ x, y }) => {
    const posX = clamp(x, PICKER_WIDTH)
    const posY = PICKER_WIDTH - clamp(y, PICKER_WIDTH)
    const newSat = Math.round((posX / PICKER_WIDTH) * 100)
    const newVal = Math.round((posY / PICKER_WIDTH) * 100)

    satValProgress.value = 0
    satValProgress.value = withSpring(1)

    sat.value = withTiming(newSat)
    val.value = withTiming(newVal)

    if (typeof onChange === 'function') {
      runOnJS(onChange)(`rgb(${toRGB(hue.value, newSat, newVal).join(',')})`)
    }
  })
  const satValGestures = Gesture.Exclusive(satValPanGesture, satValTapGesture)
  const huePanGesture = Gesture.Pan()
    .onUpdate(({ x }) => {
      const posX = clamp(x, PICKER_WIDTH)
      const newHue = Math.round((posX / PICKER_WIDTH) * 360)

      hue.value = newHue
    })
    .onEnd(() => {
      if (typeof onChange === 'function') {
        const color = toRGB(hue.value, sat.value, val.value)
        runOnJS(onChange)(`rgb(${color.join(',')})`)
      }
    })
  const hueTapGesture = Gesture.Tap().onStart(({ x }) => {
    const posX = clamp(x, PICKER_WIDTH)
    const newHue = Math.round((posX / PICKER_WIDTH) * 360)

    hueProgress.value = 0
    hueProgress.value = withSpring(1)

    hue.value = withTiming(newHue)

    if (typeof onChange === 'function') {
      runOnJS(onChange)(`rgb(${toRGB(newHue, sat.value, val.value).join(',')})`)
    }
  })
  const hueGestures = Gesture.Exclusive(huePanGesture, hueTapGesture)

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Animated.View style={[styles.circle, animatedCircleStyle]} />
      </View>
      <View style={styles.picker}>
        <GestureDetector gesture={satValGestures}>
          <Animated.View style={[styles.satValMap, animatedSatValStyle]}>
            <LinearGradient
              style={[StyleSheet.absoluteFill, styles.background]}
              colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <LinearGradient
              style={[StyleSheet.absoluteFill, styles.background]}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <Animated.View style={[styles.thumb, animatedSatValThumbStyle]}>
              <View style={styles.innerThumb} />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={hueGestures}>
          <Animated.View style={styles.hueMap}>
            <LinearGradient
              style={[StyleSheet.absoluteFill, styles.background]}
              colors={Array.from(Array(36), (_, i) => `hsl(${i * 10} 97% 50%)`)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <Animated.View style={[styles.thumb, animatedHueThumbStyle]}>
              <View style={styles.innerThumb} />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
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
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  picker: {
    marginVertical: 8,
  },
  satValMap: {
    height: PICKER_WIDTH,
    width: PICKER_WIDTH,
    borderRadius: 16,
    marginVertical: 8,
  },
  hueMap: {
    height: 32,
    width: PICKER_WIDTH,
    borderRadius: 16,
    marginVertical: 8,
  },
  background: {
    borderRadius: 16,
  },
  thumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderColor: '#FFFFFF',
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerThumb: {
    height: INNER_THUMB_SIZE,
    width: INNER_THUMB_SIZE,
    borderRadius: INNER_THUMB_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
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
