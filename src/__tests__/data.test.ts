import { getFilms } from '../data'

it('should fetch films', async () => {
  await expect(getFilms()).resolves.toBeTruthy()
})
