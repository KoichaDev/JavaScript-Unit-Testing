import { describe, it, expect } from 'vitest';
import { generateToken, generateTokenPromise } from './async-example';

describe('generateToken()', () => {
	// Done is used to say you are finished with your testing related work

	it('should generate a token', (done) => {
		const testUserEmail = 'test@test.com';

		generateToken(testUserEmail, (error, token) => {
			done();
			try {
				expect(token).toBeDefined();
				// expect(token).toBe(2);
				done();
			} catch (error) {
				done(error);
			}
		});
	});
});

describe('generateTokenPromise()', () => {
	it('should generate a token value', () => {
		const testUserEmail = 'test@test.com';

		/*
		 * you should actually return the promise assertion in your tests
		 * This guarantees that Vitest / Jest wait for the promise to be resolved.
		 * You don't need to return when using async/await (since a function annotated with async returns a promise implicitly).
		 */

		return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
	});

	/*
	 * Using async/await might especially make a lot of sense if you are actually multiple steps you want to execute
	 * instead of just one single function call, but ultimately, you can go either async/await or the solution above
	 * it('should generate a token value')
	 */
	it('should generate a token value using async/await', async () => {
		const testUserEmail = 'test@test.com';

		const token = await generateTokenPromise(testUserEmail);

		expect(token).toBeDefined();
	});
});
