import { dateFormat } from '../utils/dateFormat'

test('must format date of dateTime to BR standard', async () => {
  const today = new Date('09/19/2022')
  const todayFormatted = dateFormat(today)
  expect(todayFormatted).toBe('19/09/2022')
})
