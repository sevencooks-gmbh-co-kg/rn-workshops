import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  type ImageURISource,
  type ImageRequireSource,
} from 'react-native'
import DataView from './DataView'
import Fallback from './Fallback'

interface User {
  firstname: string
  lastname: string
  image: ImageURISource | ImageRequireSource
  subscription: string
}
const getUser = () =>
  new Promise<User>(resolve => {
    setTimeout(
      () =>
        resolve({
          firstname: 'Keanu',
          lastname: 'Reeves',
          image: require('../assets/user.jpg'),
          subscription: 'active',
        }),
      2000,
    )
  })

const ProfileTab = () => {
  return (
    <DataView getData={getUser} renderLoading={() => <Fallback loading />}>
      {({ data }) => (
        <View style={styles.container}>
          <View style={styles.top}>
            {data?.image ? (
              <Image style={styles.image} source={data?.image} />
            ) : null}
            <Text
              style={styles.name}
            >{`${data?.firstname} ${data?.lastname}`}</Text>
          </View>
          <Text style={styles.subscription}>
            Subscription status:{' '}
            <Text style={styles.status}>{data?.subscription}</Text>
          </Text>
        </View>
      )}
    </DataView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#E7E0EC',
    marginBottom: 16,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: '#49454E',
  },
  subscription: {
    fontSize: 16,
    textAlign: 'center',
  },
  status: {
    color: '#006e2c',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
})

export default ProfileTab
