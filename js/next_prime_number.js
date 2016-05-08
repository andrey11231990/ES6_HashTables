/**
 * Generates next prime number for numbers more than 23. This function will be used for hash tables to resize bucket
 * array and there min size of that array is 101, so for simplicity this function expects 'number' > 23. If you send
 * prime number as parameter, then function will return it.
 * For improved algorithm look at 'implementation 7' by link 
 * http://stackoverflow.com/questions/4475996/given-prime-number-n-compute-the-next-prime
 * @param  {Number} number New prime number must be more then value from this parameter.
 * @return {Number} Prime number.
 */
export function generateNextPrimeNumber(number) {
	var shouldContinue = true;
	while (shouldContinue) {
		if (isPrime(number)) {
			shouldContinue = false;
		} else {
			number++;
		}
	}
	return number;
}

/**
 * Checks is target number is prime.
 * @param  {Number}  number Number for cheking.
 * @return {Boolean} Returns true, if target number is prime.
 */
function isPrime(number) {
	if (number <= 23) {
		throw new Error("Number must be more then 23");
	}
	for (var i = 0; i < SMALL_PRIME_NUMBERS.length; i++) {
		if (number % SMALL_PRIME_NUMBERS[i] === 0) {
			return false;
		}
	}
	// 29 - next prime after 23, which is the largest prime number in 'SMALL_PRIME_NUMBERS' array.
	for (var i = 29; i < number; i++) {
		if (number % i === 0) {
			return false;
		}
	}
	return true;
}

/**
 * Array of small prime numbers, which we will use to check first.
 * @type {Array}
 */
var SMALL_PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23];