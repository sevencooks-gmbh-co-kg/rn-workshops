import { getFilms, query } from '../data'
import { request } from 'graphql-request'

jest.mock('graphql-request', () => ({
  ...jest.requireActual('graphql-request'),
  request: jest.fn(),
}))

const requestMock = request as jest.MockedFunctionDeep<typeof request>

const data = {
  allFilms: {
    films: [],
  },
}

beforeAll(() => {
  requestMock.mockImplementation(() => Promise.resolve(data))
})

it('should fetch films', async () => {
  await getFilms()
  expect(request).toHaveBeenCalledWith(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    query,
  )
})
