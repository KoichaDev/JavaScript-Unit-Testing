import { describe, it, expect } from 'vitest';
import { validateNotEmpty } from './validation';

it('should throw an error if an empty string is provided as a value', () => {
	const testInput = '';

	const validateFn = () => validateNotEmpty(testInput);

	expect(validateFn).toThrow();
});

it('should throw an error if an empty string is provided as a value', () => {
	const testInput = '   ';

	const validateFn = () => validateNotEmpty(testInput);

	expect(validateFn).toThrow();
});

it('should throw an error with the provided error message if error is thrown', () => {
	const testInput = '';
	const testErrorMessage = 'Test';

	const validateFn = () => validateNotEmpty(testInput, testErrorMessage);

	expect(validateFn).toThrow(testErrorMessage);
});
