import * as React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { type Film, useData } from '../data'
import Component from '../Component'

jest.mock('../data', () => ({
  useData: jest.fn(() => ({
    data: undefined,
    error: undefined,
    isLoading: false,
  })),
}))

const useDataMock = useData as jest.MockedFn<typeof useData>

it('should render the loading state', () => {
  useDataMock.mockImplementationOnce(() => ({
    data: undefined,
    error: undefined,
    isLoading: true,
  }))
  const { getByTestId } = render(<Component />)
  expect(getByTestId('loading')).toBeTruthy()
})

it('should render the error state', () => {
  const error = new Error('Some error')
  useDataMock.mockImplementationOnce(() => ({
    data: undefined,
    error,
    isLoading: false,
  }))
  const { getByText } = render(<Component />)
  expect(getByText(/Sorry/i)).toBeTruthy()
})

it('should render the data', () => {
  const mockData = [
    {
      id: 'some-id',
      title: 'Some title',
      openingCrawl: 'Some crawl',
    },
    {
      id: 'another-id',
      title: 'Another title',
      openingCrawl: 'Another crawl',
    },
  ] satisfies Film[]
  useDataMock.mockImplementationOnce(() => ({
    data: mockData,
    error: undefined,
    isLoading: false,
  }))
  const { getByText, getAllByText } = render(<Component />)

  expect(getAllByText(/title/i)).toHaveLength(2)
  expect(getByText('Some title')).toBeTruthy()
})

it('should handle onPressFilm', () => {
  const mockData = [
    {
      id: 'some-id',
      title: 'Some title',
      openingCrawl: 'Some crawl',
    },
    {
      id: 'another-id',
      title: 'Another title',
      openingCrawl: 'Another crawl',
    },
  ] satisfies Film[]
  useDataMock.mockImplementationOnce(() => ({
    data: mockData,
    error: undefined,
    isLoading: false,
  }))
  const mockOnPress = jest.fn()
  const { getByText } = render(<Component onPressFilm={mockOnPress} />)
  const element = getByText('Some title')

  fireEvent.press(element)

  expect(mockOnPress).toHaveBeenCalledTimes(1)
  expect(mockOnPress).toHaveBeenCalledWith(mockData[0])
})
