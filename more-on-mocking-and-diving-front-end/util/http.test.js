import { describe, expect, it, vi } from 'vitest';
import { HttpError } from './errors';
import { sendDataRequest } from './http';

/*
 * stubGlobal allows us to replace globally available objects or functions with our implementation.
 */

const testResponseData = { testKey: 'testData' };

/*
 * This is not the original, but it does have some functionalities which we need
 * for our code to work and it does have some functionality that allows us to test
 * various things. We don't want to use the original function, because we don't want
 * to send real requests to the server.
 */

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') {
			return reject('Not a string.');
		}
		const testResponse = {
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(testResponseData);
				});
			},
		};
		resolve(testResponse);
	});
});

vi.stubGlobal('fetch', testFetch);

describe('sendDataRequest()', () => {
	it('should return any available response data', () => {
		const testData = { key: 'test' };

		return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
	});

	it('should convert the provided data to JSON before sending the request', async () => {
		const testData = { key: 'test' };

		let errorMessage;

		try {
			await sendDataRequest(testData);
		} catch (error) {
			errorMessage = error;
		}

		expect(errorMessage).not.toBe('Not a string.');
	});

	it('should throw an HttpError in case of non-ok responses', () => {
		testFetch.mockImplementationOnce((url, options) => {
			return new Promise((resolve, reject) => {
				const testResponse = {
					ok: false,
					json() {
						return new Promise((resolve, reject) => {
							resolve(testResponseData);
						});
					},
				};
				resolve(testResponse);
			});
		});

		const testData = { key: 'test' };

		return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
	});
});
