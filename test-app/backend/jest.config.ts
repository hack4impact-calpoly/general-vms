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
  transformIgnorePatterns: [
    'node_modules/(?!(@general-vms))',
  ],
  rootDir: '.',
  modulePaths: ['<rootDir>', '<rootDir>/src'],
  roots: ['<rootDir>', '<rootDir>/src'],
};

export default config;
