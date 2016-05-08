import { 
	getHashByPolynom,
	getHashByCyclicShift,
	getHashCodeByCyclicShift
} from "hash_functions";

describe("Hash functions", function() {
	var isInteger = function(number) {
		return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
	};

	describe(" - getHashByPolynom", function() {
		it(" - should return integer value for empty string", function() {
			var result = getHashByPolynom("");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for short key", function() {
			var result = getHashByPolynom("key");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for long key", function() {
			var result = getHashByPolynom("this is really long key for my hash function");
			expect(isInteger(result)).toEqual(true);
		});
	});

	describe(" - getHashByCyclicShift", function() {
		it(" - should return integer value for empty string", function() {
			var result = getHashByCyclicShift("");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for short key", function() {
			var result = getHashByCyclicShift("key");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for long key", function() {
			var result = getHashByCyclicShift("this is really long key for my hash function");
			expect(isInteger(result)).toEqual(true);
		});
	});

	describe(" - getHashCodeByCyclicShift", function() {
		it(" - should return integer value for empty string", function() {
			var result = getHashCodeByCyclicShift("");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for short key", function() {
			var result = getHashCodeByCyclicShift("key");
			expect(isInteger(result)).toEqual(true);
		});

		it(" - should return integer value for long key", function() {
			var result = getHashCodeByCyclicShift("this is really long key for my hash function");
			expect(isInteger(result)).toEqual(true);
		});
	});
});