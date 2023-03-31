import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Fallback from './Fallback'
import withData from './withData'

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

interface ListTabProps {
  data: Item[]
}
const ListTab = ({ data }: ListTabProps) => {
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

export default withData(getItems, Fallback)(ListTab)
