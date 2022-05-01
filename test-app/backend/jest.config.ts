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
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  rootDir: '.',
  modulePaths: ['<rootDir>', '<rootDir>/src'],
};

export default config;
