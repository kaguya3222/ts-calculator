const operators = {
  '+': {
    precedence: 1,
    operation: (operand1: number, operand2: number) => operand1 + operand2,
  },
  '-': {
    precedence: 1,
    operation: (operand1: number, operand2: number) => operand1 - operand2,
  },
  '*': {
    precedence: 2,
    operation: (operand1: number, operand2: number) => operand1 * operand2,
  },
  '/': {
    precedence: 2,
    operation: (operand1: number, operand2: number) => operand1 / operand2,
  },
} as const

type OperatorKey = keyof typeof operators

const comparePrecedence = (operator1: OperatorKey, operator2: OperatorKey) => {
  return operators[operator1].precedence >= operators[operator2].precedence
}

const isOperator = (token: string | number): token is OperatorKey => {
  return token in operators
}

const isOperand = (token: string | number): token is number => {
  return !Number.isNaN(Number(token))
}

type Parenthesis = '(' | ')'

const validateExpression = (expression: string) => {
  const parsed = expression.replace(/\s/g, '').match(/(\d+|\+|-|\*|\/|\(|\))/g)

  if (
    !parsed ||
    parsed.length === 0 ||
    parsed.every((token) => !isOperand(token)) ||
    parsed.every((token) => !isOperator(token))
  ) {
    throw new Error('Invalid expression')
  }

  return parsed
}

const parse = (expression: string) => {
  const tokens = validateExpression(expression)

  const stack: Array<OperatorKey | Parenthesis> = []
  const output: Array<number | OperatorKey> = []

  tokens.forEach((token) => {
    const isOperand = !Number.isNaN(Number(token))

    if (isOperand) {
      output.push(Number(token))
    }

    if (isOperator(token)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        comparePrecedence(stack[stack.length - 1] as OperatorKey, token)
      ) {
        output.push(stack.pop() as OperatorKey)
      }
      stack.push(token)
    }

    if (token === '(') {
      stack.push(token)
    }

    if (token === ')') {
      while (stack[stack.length - 1] !== '(') {
        output.push(stack.pop() as OperatorKey)
      }

      stack.pop()
    }
  })

  while (stack.length) output.push(stack.pop() as OperatorKey)

  return output
}

export const calculate = (expression: string) => {
  const rpn = parse(expression)
  const stack: Array<number> = []

  rpn.forEach((token) => {
    const isOperand = typeof token === 'number'

    if (isOperand) {
      stack.push(token)
    } else if (isOperator(token)) {
      const operand2 = stack.pop() as number
      const operand1 = stack.pop() as number
      const result = operators[token].operation(operand1, operand2)
      stack.push(result)
    }
  })

  return stack.pop() as number
}
