import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface Item {
  id: string
}
const getItems = () =>
  new Promise<Item[]>(resolve => {
    setTimeout(
      () =>
        resolve(
          Array.from(Array(32), (_, i) => ({
            id: i.toString(),
          })),
        ),
      2000,
    )
  })

const ListTab = () => {
  const [data, setData] = React.useState<Item[] | undefined>()
  const [error, setError] = React.useState<unknown>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getItems()
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
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{`Item ${item.id}`}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  item: {
    flex: 1,
    justifyContent: 'center',
    height: 64,
    paddingHorizontal: 8,
    backgroundColor: '#E7E0EC',
    marginVertical: 4,
    borderRadius: 8,
  },
  itemText: {
    color: '#49454E',
  },
})

export default ListTab
