// file: apps/api/jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  clearMocks: true
};
