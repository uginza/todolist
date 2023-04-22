const tsPreset = require('ts-jest/jest-preset')
const puppeteerPreset = require('jest-puppeteer/jest-preset')
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...tsPreset,
  ...puppeteerPreset,
  testMatch:[ '**/*.test.{js,ts,tsx,jsx}'],
  setupFilesAfterEnv: ['./setupTests.js']
};