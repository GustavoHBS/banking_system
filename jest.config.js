module.exports = {
  modulePaths: ['<rootDir>/'],
  moduleNameMapper: {
    'src/(.*)': 'src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*'],
};
