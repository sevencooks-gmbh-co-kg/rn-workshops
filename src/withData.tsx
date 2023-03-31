import * as React from 'react'

interface FallProps {
  loading: boolean
  error: unknown
}

const withData =
  <Data,>(
    getData: () => Promise<Data>,
    Fallback: React.ComponentType<FallProps>,
  ) =>
  <P,>(Component: React.ComponentType<P & { data: Data }>) =>
  (props: Omit<P, 'data'>) => {
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

    if (data) {
      return <Component data={data} {...(props as P)} />
    }

    if (Fallback) {
      return <Fallback error={error} loading={loading} />
    }

    return null
  }

export default withData
