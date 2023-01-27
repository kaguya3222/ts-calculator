type Expression = string

const parse = (expression: Expression) => {
  const test = expression.replace(/\s/g, '').split('')

  console.log(test)

  const [first, operator, second] = test

  return {
    first,
    operator,
    second,
  }
}

// TODO: implement shunting-yard algorithm

export const calculate = (expression: Expression) => {
  const { first, operator, second } = parse(expression)

  if (operator === '+') {
    return Number(first) + Number(second)
  } else if (operator === '-') {
    return Number(first) - Number(second)
  } else if (operator === '*') {
    return Number(first) * Number(second)
  } else if (operator === '/') {
    return Number(first) / Number(second)
  }
}

console.log(calculate('1 + 3 * 2 - 4 / 2'))
