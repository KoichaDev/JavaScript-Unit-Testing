import { describe, expect, it, vi } from 'vitest';
import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should execute logFN if provided', () => {
		// creates an empty function which keeps tracks of any function executions
		// of that function, so any calls to that function.
		// It also keeps track of the arguments that were provided with those calls
		// it allows us to find out whether it was executed, because it's a "spy"
		const logger = vi.fn();

		generateReportData(logger);

		expect(logger).toBeCalled();
	});
});
