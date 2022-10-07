import { it, expect } from 'vitest';

import { add } from './math';

it('should summarize all number values in an array', () => {
	// Arrange phase
	const numbers = [1, 2, 3];

	// Act phase - execute the function to get the result
	const result = add(numbers);

	// Assert
	const expectedResult = numbers.reduce((prevValue, currentValue) => {
		return prevValue + currentValue;
	}, 0);
	expect(result).toBe(expectedResult);
});

it('should yield NaN if a least one invalid numbers is provided', () => {
	const inputs = ['invalid', 1];

	const result = add(inputs);

	expect(result).toBeNaN();
});

it('should yield a correct sum if an array of numeric string values is provided', () => {
	const numbers = ['1', '2'];

	const result = add(numbers);

	const expectedResult = numbers.reduce((prevValue, currentValue) => {
		return +prevValue + +currentValue;
	}, 0);

	expect(result).toBe(expectedResult);
});

it('should yield 0 if an empty array is provided', () => {
	const numbers = [];

	const result = add(numbers);

	expect(result).toBe(0);
});

it('should throw an error if no value is passed into the function', () => {
	const resultFn = () => {
		add();
	};

	// toThrow() will let vitest to execute the resultFn and check if it throws an error
	// It saves us the hassle to write a try-catch blocks. Jest also supports the similar syntax
	expect(resultFn).toThrow('is not iterable');
});

it('should throw an error if provided with multiple arguments instead of an array', () => {
	const num1 = 1;
	const num2 = 2;
	const num3 = 3;

	const resultFn = () => {
		add(num1, num2, num3);
	};

	expect(resultFn).toThrow('is not iterable');
});
