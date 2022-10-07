import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';

import { User } from './hooks';
const testEmail = 'test@test.com';
// Keep in mind that sometimes you have multiple suites and you might not want a global value
// in the overall testing file like this, but you might want to have a general shared value
// for a specific suite and maybe multiple suites should share the same variable with different values
let user = new User(testEmail);

// We can use it for some overall initialization
beforeAll(() => {
	console.log('beforeall()');
});

beforeEach(() => {
	user = new User(testEmail);

	console.log('beforeEach()');
});

afterEach(() => {
	console.log('afterEach()');
});

// Let's say you have some testing database before all of your tests are executed.
// once your test has finished, you want to erase the database, so nothing is saved
// on your file system, then it's a good idea to use a cleanup function of afterAll()
afterAll(() => {
	console.log('afterAll()');
});

it.concurrent('should update the email', () => {
	const newTestEmail = 'test2@test.com';

	user.updateEmail(newTestEmail);

	expect(user.email).toBe(newTestEmail);
});

it.concurrent('should have an email property', () => {
	expect(user).toHaveProperty('email');
});

it.concurrent('should store the provided email value', () => {
	expect(user.email).toBe(testEmail);
});

it.concurrent('should clear the email', () => {
	user.clearEmail();

	expect(user.email).toBe('');
});

it.concurrent(
	'should still have an email property after clearing the email',
	() => {
		user.clearEmail();

		expect(user).toHaveProperty('email');
	}
);
