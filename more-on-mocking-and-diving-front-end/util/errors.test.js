import { describe, it, expect } from 'vitest';
import { HttpError, ValidationError } from './errors.js';

describe('class HTTPError', () => {
	it('should contain the provided status code, message and data', () => {
		const testStatus = 1;
		const testMessage = 'test message';
		const testData = { key: 'test' };

		const testError = new HttpError(testStatus, testMessage, testData);

		const { statusCode, message, data } = testError;

		expect(statusCode).toBe(testStatus);
		expect(message).toBe(testMessage);
		expect(data).toBe(testData);
	});

	it('should contain undefined as data if no data is provided', () => {
		const testStatus = 1;
		const testMessage = 'test message';
		const testData = { key: 'test' };

		const testError = new HttpError(testStatus, testMessage);

		const { statusCode, message, data } = testError;

		expect(statusCode).toBe(testStatus);
		expect(message).toBe(testMessage);
		expect(data).not.toBeDefined();
	});
});

describe('class ValidationError', () => {
	it('should contain the provided message', () => {
		const testMessage = 'test';

		const testError = new ValidationError(testMessage);

		expect(testError.message).toBe(testMessage);
	});
});
