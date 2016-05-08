import HashTable from "hash_table_linked_list";

describe("HashTable", function() {
	var fillHashTable = function(hashTable, length) {
		for (var i = 0; i < length; i++) {
			hashTable.add(i + "", i);
		}
	};

	describe(" - add", function() {
		it(" - should add new element to array", function() {
			var hashTable = new HashTable();
			hashTable.add("1", 1);
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(1);
		});

		it(" - should change property 'count'", function() {
			var hashTable = new HashTable();
			var length = 5;
			for (var i = 0; i < length; i++) {
				hashTable.add(i + "", i);
				expect(hashTable.count).toEqual(i + 1);
			}
		});

		it(" - should resize bucket array when we get more then 10 items in one bucket", function() {
			var hashTable = new HashTable();
			var length = 1000;
			fillHashTable(hashTable, length);
			expect(hashTable._items.length).toBeGreaterThan(hashTable._defaultArraySize);
		});
	});

	describe(" - getKeys", function() {
		it(" - should return array with all keys in hash table", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var keys = hashTable.getKeys();
			for (var i = 0; i < length; i++) {
				expect(keys).toEqual(jasmine.arrayContaining([i + ""]));
			}
		});

		it(" - should return empty array if hash table is empty", function() {
			var hashTable = new HashTable();
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(0);
		});
	});

	describe(" - getValues", function() {
		it(" - should return array with all values in hash table", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var values = hashTable.getValues();
			for (var i = 0; i < length; i++) {
				expect(values).toEqual(jasmine.arrayContaining([i]));
			}
		});

		it(" - should return empty array if hash table is empty", function() {
			var hashTable = new HashTable();
			var values = hashTable.getValues();
			expect(values.length).toEqual(0);
		});
	});

	describe(" - getValueByKey", function() {
		it(" - should return value if it was added with target key", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var value = hashTable.getValueByKey("3");
			expect(value).toBeDefined();
		});

		it(" - should return undefined if target key was not added to hash table", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var value = hashTable.getValueByKey("7");
			expect(value).toBeUndefined();
		});
	});

	describe(" - clear", function() {
		it(" - should remove items from bucket array", function() {
			var hashTable = new HashTable();
			var length = 1000;
			fillHashTable(hashTable, length);
			hashTable.clear();
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(0);
		});

		it(" - should reset 'count' property", function() {
			var hashTable = new HashTable();
			var length = 1000;
			fillHashTable(hashTable, length);
			hashTable.clear();
			expect(hashTable.count).toEqual(0);
		});
	});

	describe(" - contains", function() {
		it(" - should return 'true' if target key exist", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var isContains = hashTable.contains("3");
			expect(isContains).toEqual(true);
		});

		it(" - should return 'false' if terget key does not exist", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			var isContains = hashTable.contains("9");
			expect(isContains).toEqual(false);
		});
	});

	describe(" - remove", function() {
		it(" - should remove value by target key", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			hashTable.remove("3");
			var value = hashTable.getValueByKey("3");
			expect(value).toBeUndefined();
		});

		it(" - should remove only target value by key even if in bucket exist few items", function() {
			var hashTable = new HashTable();
			var length = 300;
			fillHashTable(hashTable, length);
			hashTable.remove("3");
			for (var i = 0; i < length; i++) {
				if (i !== 3) {
					var isContains = hashTable.contains(i + "");
					expect(isContains).toEqual(true);
				}
			}
		});

		it(" - should change 'count' property", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			hashTable.remove("3");
			expect(hashTable.count).toEqual(length - 1);
		});

		it(" - should nothing change if key does not exist in hash table", function() {
			var hashTable = new HashTable();
			var length = 7;
			fillHashTable(hashTable, length);
			hashTable.remove("9");
			expect(hashTable.count).toEqual(length);
			for (var i = 0; i < length; i++) {
				var isContains = hashTable.contains(i + "");
				expect(isContains).toEqual(true);
			}
		});
	});
});
