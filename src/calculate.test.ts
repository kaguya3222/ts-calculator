import { calculate } from './calculate'

describe('calculate', () => {
  test.each([
    ['1 + 1', 2],
    ['1 - 2', -1],
    ['3 * 2', 6],
    ['4 / 2', 2],
    ['1 + 2 * 3', 7],
    ['3 * 2 - 1 / 2', 5.5],
    ['4+18/(9-3)', 7],
    ['(5+3) * 6 - (2+3)', 43],
    ['12 / 3 - (4 * 6) / 4 - 15', -17],
    ['6/3+ 15  ', 17],
    ['(13+13) * 8 - (3 + 6) / 15 + (4 * 6) / 4', 213.4],
  ])('should calculate %s', (expression, result) => {
    expect(calculate(expression)).toBe(result)
  })

  test.each(['', '1^2', '11', '++', '()', '(+-)', '12'])(
    'should throw an error if expression contains invalid characters: "%s"',
    (expression) => {
      expect(() => calculate(expression)).toThrowError()
    }
  )
})
