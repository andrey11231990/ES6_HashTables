/**
 * Compression functions for hash tables.
 */

/**
 * Division compression method.
 * @param  {Number} hash Uncompressed hash.
 * @param  {Number} arraySize Size of bucket array.
 * @return {Number} Compressed hash value.
 */
export function compressByDivision(hash, arraySize) {
	hash = Math.abs(hash);
	return hash % arraySize;
}

/**
 * Multiply add and divide method. 'scaleFactor' and 'shift' must be randomly picked before compression, for it we
 * must use functions '_computeScaleFactorForMAD' and '_computeShiftForMAD'.
 * @param  {Number} hash Uncompressed hash value.
 * @param  {Number} arraySize Size of bucket array.
 * @param  {Number} scaleFactor Value for scale factor.
 * @param  {Number} shift Value for shift.
 * @return {Number} Compressed hash value.
 */
export function compressByMAD(hash, arraySize, scaleFactor, shift) {
	var hash = Math.abs(hash);
	var result = (scaleFactor * hash + shift) % arraySize;
	return result;
}

/**
 * Returns value for scale fastor in MAD method of compression. Value must be coprime with length of bucket array.
 * Link to discussion - http://stackoverflow.com/questions/3017108/mad-method-compression-function.
 * I could not find good algorithm for finding coprime numbers so i will just get prime number lesser then size of
 * array.
 * Other way is to get random number and check if it is coprime number. If not, then loop to the next number and so on
 * while you do not get the coprime number. This has sense because chance to get coprime number by first pick is about
 * 60%.
 * @param  {Number} arraySize Size of bucket array.
 * @return {Number} Value for scale factor.
 */
export function _computeScaleFactorForMAD(arraySize) {
	var primes = getLesserPrimeNumbers(arraySize);
	var index = getRandomNumber(0, primes.length);
	return primes[index];
}

/**
 * Returns value for shift in MAD method of compression. Value must be >= 0. For simplicity we will return 0.
 * @return {Number} Value for shift.
 */
export function _computeShiftForMAD() {
	return 0;
}

/**
 * Generate array of prime numbers, which is lesser then target 'number'.
 * @param  {Number} number Max number, which can be in resulting array.
 * @return {Array} Array of prime numbers.
 */
export function getLesserPrimeNumbers(number) {
	var sieve = [];
	var primes = [];
	for (var i = 2; i <= number; i++) {
		if (!sieve[i]) {
			primes.push(i);
			for (var j = i << 1; j <= number; j += i) {
				sieve[j] = true;
			}
		}
	}
	return primes;
}

/**
 * Generates random number from target range.
 * @param  {Number} min Min number of the range.
 * @param  {Number} max Max number of the range.
 * @return {Number} Random number from the range.
 */
export function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}