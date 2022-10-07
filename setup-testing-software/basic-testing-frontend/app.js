import { calculateResult } from './src/math.js';
import { generateResultText, outputResult } from './src/output.js';
import { extractEnteredNumberValues } from './src/parser.js';

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const numberValues = extractEnteredNumberValues(form);

	const result = calculateResult(numberValues);
	const resultText = generateResultText(result);

	outputResult(resultText);
});
