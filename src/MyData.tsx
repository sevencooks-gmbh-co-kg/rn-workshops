import * as React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

interface Data {
  title: string
  content: string
}
const getData = () =>
  new Promise<Data>(resolve => {
    setTimeout(
      () =>
        resolve({
          title: 'Arbitrary title',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }),
      2000,
    )
  })

const MyData = () => {
  const [data, setData] = React.useState<Data | undefined>()
  const [error, setError] = React.useState<unknown>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.content}>{data?.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
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
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {},
})

export default MyData
