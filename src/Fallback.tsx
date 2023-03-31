import * as React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

interface FallbackProps {
  loading?: boolean
  error?: unknown
}
const Fallback = ({ loading, error }: FallbackProps) => {
  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Some error occured</Text>
      </View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3261E',
  },
  errorText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
})

export default Fallback
