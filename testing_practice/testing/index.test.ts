import {describe, expect, test} from '@jest/globals';
import {sum} from './src/index';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

// Add ts-jest as a dependency
// npm install --save-dev ts-jest  @jest/globals

// Initialize jest.config.ts
// npx ts-jest config:init

// Update package.json
// "scripts": {
    // "test": "jest"
// },
// Run "npm run test"


// - It's importing testing tools from Jest (describe, expect, test)
// It's importing a sum function that we want to test from another file
// Test Structure:
// describe creates a test group/suite named 'sum module'
// Inside that, we have a single test that checks if the sum function works correctly


// - The test has a descriptive name: "adds 1 + 2 to equal 3"
// It calls the sum function with inputs 1 and 2
// expect().toBe() is an assertion that checks if the result equals 3
// In plain English, this test is saying:
// > "Hey, when I give the numbers 1 and 2 to my sum function, I expect to get back the number 3. If I get anything else, something's wrong with my function!"
// This is a very basic example of unit testing, where we're testing a single function (sum) to make sure it behaves exactly as we expect it to.