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
  const [data, setData] = React.useState<User | undefined>()
  const [error, setError] = React.useState<unknown>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getUser()
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
