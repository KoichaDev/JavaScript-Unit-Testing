import { describe, expect, it, vi } from 'vitest';
import { promises as fs } from 'fs';
import { writeData } from './io';

/*
 * This will kick off jest/vitest auto-mocking algorithm and will basically find
 * the fs modules and basically replace all the functions with empty spy functions
 * and when calling the writeData(), it should no longer write test.txt file
 * because the fs module provided by node is replaced by mock version which
 * has only empty functions that don't do anything.
 * This doesn't affect production code, there, this mock won't active. It's only during testing
 * This is perfect not creating any side-effects to creating data to the file system
 */

vi.mock('fs');
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => {
				// It's a mock function for path.join() function. It's basically returning the last argument of the function.
				// The last argument will always be the file name as you can see on writeData() function
				return args[args.length - 1];
			},
		},
	};
});

describe('writeData()', () => {
	it('should return a promise that resolves to no value if called correctly', () => {
		const testData = 'Test Data Lorem Ipsum';
		const testFileName = 'test.txt';

		writeData(testData, testFileName);

		// The Mock module also use automatically created spy function to find whether the function was called
		// expect(fs.writeFile).toBeCalled();

		// The Mock module also use automatically created spy function to find whether the function was called with the correct arguments
		// based on the fs.writeFile() function, it should be called with the file name and the data
		// expect(fs.writeFile).toBeCalledWith(testFileName, testData);

		// we don't get any values back, so it is expected to be undefined
		return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
	});
});
