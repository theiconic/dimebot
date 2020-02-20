module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  setupFiles: [
    '<rootDir>/tests/bootstrap.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app/config/*',
    '!src/app/App.ts',
    '!src/app/server.ts',
    '!src/main.ts',
  ],
  coverageReporters: [
    'html',
    'lcov',
  ]
};