import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./test/setupTests.ts'],
};

export default config;
