import * as React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated'

const CHECKED_THUMB_COLOR = '#FFFFFF'
const CHECKED_TRACK_COLOR = '#6750A4'
const CHECKED_BORDER_COLOR = '#6750A4'
const UNCHECKED_THUMB_COLOR = '#79747E'
const UNCHECKED_TRACK_COLOR = '#E6E1E5'
const UNCHECKED_BORDER_COLOR = '#79747E'
const CHECKED_PRESSED_COLOR = '#EADDFF'
const UNCHECKED_PRESSED_COLOR = '#49454E'

const timingConfig: WithTimingConfig = {
  duration: 100,
  easing: Easing.bezierFn(0.4, 0, 0.2, 1),
}
const springConfig: WithSpringConfig = {
  mass: 0.25,
  stiffness: 250,
}

interface ToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
}
const Toggle = ({ checked, onChange }: ToggleProps) => {
  const pressed = useSharedValue(0)
  const offset = useDerivedValue(() => {
    return withSpring(checked ? 22 : 2, springConfig)
  })
  const progress = useDerivedValue(() =>
    withTiming(checked ? 1 : 0, timingConfig),
  )
  const handlePressIn = () => {
    pressed.value = withTiming(1, timingConfig)
  }
  const handlePress = () => {
    pressed.value = withTiming(0, timingConfig)
    onChange?.(!checked)
  }
  const animatedTrackStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [UNCHECKED_BORDER_COLOR, CHECKED_BORDER_COLOR],
    ),
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [UNCHECKED_TRACK_COLOR, CHECKED_TRACK_COLOR],
    ),
  }))
  const animatedThumbStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [UNCHECKED_THUMB_COLOR, CHECKED_THUMB_COLOR],
    ),
    transform: [
      { translateX: offset.value },
      {
        scale: interpolate(progress.value, [0, 1], [16 / 24, 1]),
      },
    ],
  }))
  const animatedPressedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      [
        progress.value < 0.5 ? UNCHECKED_THUMB_COLOR : CHECKED_THUMB_COLOR,
        progress.value < 0.5 ? UNCHECKED_PRESSED_COLOR : CHECKED_PRESSED_COLOR,
      ],
    ),
    transform: [
      { translateX: offset.value },
      {
        scale: interpolate(
          pressed.value,
          [0, 1],
          [progress.value < 0.5 ? 16 / 24 : 1, 28 / 24],
        ),
      },
    ],
  }))
  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} hitSlop={8}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View
          style={[styles.thumb, animatedThumbStyle, animatedPressedStyle]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    height: 32,
    width: 52,
    borderRadius: 16,
    borderWidth: 2,
  },
  thumb: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
})

export default Toggle
