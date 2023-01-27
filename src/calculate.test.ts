import { calculate } from './calculate'

describe('calculate', () => {
  test.each([
    ['1 + 1', 2],
    ['1 - 2', -1],
    ['3 * 2', 6],
    ['4 / 2', 2],
    ['1 + 2 * 3', 7],
  ])('should calculate %s', (expression, result) => {
    expect(calculate(expression)).toBe(result)
  })
})
