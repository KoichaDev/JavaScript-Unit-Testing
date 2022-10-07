/**
 * It takes a formData object and returns an array of numbers
 * @param formData - The FormData object that contains the form data.
 * @returns [num1Input, num2Input]
 */
export function extractNumbers(formData) {
	const num1Input = formData.get('num1');
	const num2Input = formData.get('num2');

	return [num1Input, num2Input];
}

export function extractEnteredNumberValues(form) {
	const formData = new FormData(form);
	const numberInputs = extractNumbers(formData);
	return numberInputs;
}
