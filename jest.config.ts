import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['**/src/**/*.test.ts'],
}
export default config
