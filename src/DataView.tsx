import * as React from 'react'

interface DataProps<Data> {
  data: Data | undefined
  error: unknown
  loading: boolean
}

interface DataViewProps<Data> {
  getData: () => Promise<Data>
  renderError?: (error: unknown) => React.ReactNode
  renderLoading?: () => React.ReactNode
  children: (props: DataProps<Data>) => React.ReactNode
}
const DataView = <Data,>({
  getData,
  renderLoading,
  renderError,
  children,
}: DataViewProps<Data>) => {
  const [data, setData] = React.useState<Data | undefined>()
  const [error, setError] = React.useState<unknown>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    getData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [getData])

  if (loading && typeof renderLoading === 'function') {
    return <>{renderLoading()}</>
  }

  if (error && typeof renderError === 'function') {
    return <>{renderError(error)}</>
  }

  return <>{children({ data, error, loading })}</>
}

export default DataView
