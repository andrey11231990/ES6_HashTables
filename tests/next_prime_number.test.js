import { 
	generateNextPrimeNumber
} from "next_prime_number";

describe("Get next prime number", function() {
	var isInteger = function(number) {
		return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
	};
	describe(" - generateNextPrimeNumber", function() {
		it(" - should return integer", function() {
			var number = generateNextPrimeNumber(40);
			expect(isInteger(number)).toEqual(true);
		});

		it(" - should return bigger prime number then target", function() {
			var prime = [29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127,
				131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
				239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];
			for (var i = 0; i < prime.length - 1; i++) {
				var nextPrime = generateNextPrimeNumber(prime[i] + 1);
				expect(nextPrime).toEqual(prime[i + 1]);
			}
		});

		it(" - should throw exception if target number is less then 23", function() {
			expect(function() {
				generateNextPrimeNumber(23);
			}).toThrowError("Number must be more then 23");
			expect(function() {
				generateNextPrimeNumber(4);
			}).toThrowError("Number must be more then 23");
		});
	});
});