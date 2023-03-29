import * as React from 'react'
import { request, gql } from 'graphql-request'

export interface Film {
  id: string
  title: string
  openingCrawl: string
}

type QueryResponse = {
  allFilms: {
    films: Film[]
  }
}

const endpoint = 'https://swapi-graphql.netlify.app/.netlify/functions/index'

const query = gql`
  {
    allFilms {
      films {
        id
        title
        openingCrawl
      }
    }
  }
`

export const getFilms = () =>
  request<QueryResponse>(endpoint, query).then(data => data.allFilms.films)

export const useData = () => {
  const [data, setData] = React.useState<Film[] | undefined>()
  const [error, setError] = React.useState<unknown>()
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const res = await getFilms()
        setData(res)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return { data, error, isLoading }
}
