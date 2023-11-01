import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node'
}

export default config
