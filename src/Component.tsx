import * as React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useData } from './data'

const Component = () => {
  const { data, error, isLoading } = useData()
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Sorry an Error occured.</Text>
      </View>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map(film => (
        <View key={film.id} style={styles.card}>
          <Text style={styles.title}>{film.title}</Text>
          <Text style={styles.crawl}>{film.openingCrawl}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
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
    color: '#FFFFFF',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6750A4',
    borderRadius: 16,
    marginVertical: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  crawl: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
})

export default Component
