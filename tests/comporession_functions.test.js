import { 
	compressByDivision,
	compressByMAD,
	getLesserPrimeNumbers,
	getRandomNumber,
	_computeScaleFactorForMAD,
	_computeShiftForMAD
} from "comporession_functions";

describe("Compression functions", function() {
	var isInteger = function(number) {
		return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
	};

	describe(" - compressByDivision", function() {
		var hash = 234242402;
		var arraySize = 101;
		var result = compressByDivision(hash, arraySize);

		it(" - should return index in range of target array size", function() {
			expect(result).toBeLessThan(arraySize);
		});

		it(" - should return integer number", function() {
			expect(isInteger(result)).toEqual(true);
		});
	});

	describe(" - compressByMAD", function() {
		var hash = 234242402;
		var arraySize = 101;
		var scaleFactor = _computeScaleFactorForMAD(arraySize);
		var shift = _computeShiftForMAD();
		var result = compressByMAD(hash, arraySize, scaleFactor, shift);

		it(" - should return index in range of target array size", function() {
			expect(result).toBeLessThan(arraySize);
		});

		it(" - should return integer number", function() {
			expect(isInteger(result)).toEqual(true);
		});
	});

	describe(" - compression utils functions", function() {
		describe(" - getLesserPrimeNumbers", function() {
			var expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
				89, 97];
			var result = getLesserPrimeNumbers(100);

			it(" - should return array", function() {
				var stringName = Object.prototype.toString.call(result);
				expect(stringName).toEqual("[object Array]");
			});

			it(" - should return prime numbers", function() {
				expect(result).toEqual(jasmine.arrayContaining(expected));
			});
		});

		describe(" - getRandomNumber", function() {
			var min = 1;
			var max = 100;
			var result = getRandomNumber(min, max);

			it(" - should return integer number", function() {
				expect(isInteger(result)).toEqual(true);
			});

			it(" - should return value between min and max", function() {
				expect(result).toBeLessThan(max);
				expect(result).toBeGreaterThan(min);
			});
		});
	})
});