import { dateFormat } from './dateFormat'

test('must format date of dateTime to BR standard', async () => {
  const today = new Date('2022-09-19')
  const todayFormatted = dateFormat(today)
  expect(todayFormatted).toBe('19/09/2022')
})
