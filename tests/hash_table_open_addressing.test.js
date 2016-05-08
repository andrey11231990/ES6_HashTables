import HashTable from "hash_table_open_addressing";

describe("HashTable", function() {
	var fillHashTable = function(hashTable, length) {
		for (var i = 0; i < length; i++) {
			hashTable.add(i + "", i);
		}
	};

	describe("add", function() {
		it(" - should resize bucket array when load factor > 80%", function() {
			var hashTable = new HashTable();
			var length = 100;
			fillHashTable(hashTable, length);
			expect(hashTable._items.length).toBeGreaterThan(hashTable._defaultArraySize);
		});

		it(" - should change 'count' property", function() {
			var hashTable = new HashTable();
			var length = 10;
			fillHashTable(hashTable, length);
			expect(hashTable.count).toEqual(length);
		});

		it(" - should change '_total' property", function() {
			var hashTable = new HashTable();
			var length = 10;
			fillHashTable(hashTable, length);
			expect(hashTable._total).toEqual(length);
		});

		it(" - should add new element to bucket array", function() {
			var hashTable = new HashTable();
			var length = 100;
			fillHashTable(hashTable, length);
			var keys = hashTable.getKeys();
			for (var i = 0; i < length; i++) {
				expect(keys.indexOf(i + "")).toBeGreaterThan(-1);
			}
		});
	});

	describe("getKeys", function() {
		it(" - should return array of all keys in hash table", function() {
			var hashTable = new HashTable();
			var length = 10;
			fillHashTable(hashTable, length);
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(length);
			for (var i = 0; i < length; i++) {
				expect(keys.indexOf(i + "")).toBeGreaterThan(-1);
			}
		});
		it(" - should return array of all keys in hash table after resize", function() {
			var hashTable = new HashTable();
			var length = 100;
			fillHashTable(hashTable, length);
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(length);
			for (var i = 0; i < length; i++) {
				expect(keys.indexOf(i + "")).toBeGreaterThan(-1);
			}
		});

		it(" - should return empty array for empty hash table", function() {
			var hashTable = new HashTable();
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(0);
		});
	});

	describe("getValues", function() {
		it(" - should return array of all values in hash table", function() {
			var hashTable = new HashTable();
			var length = 10;
			fillHashTable(hashTable, length);
			var values = hashTable.getValues();
			expect(values.length).toEqual(length);
			for (var i = 0; i < length; i++) {
				expect(values.indexOf(i)).toBeGreaterThan(-1);
			}
		});
		it(" - should return array of all values in hash table after resize", function() {
			var hashTable = new HashTable();
			var length = 100;
			fillHashTable(hashTable, length);
			var values = hashTable.getValues();
			expect(values.length).toEqual(length);
			for (var i = 0; i < length; i++) {
				expect(values.indexOf(i)).toBeGreaterThan(-1);
			}
		});

		it(" - should return empty array for empty hash table", function() {
			var hashTable = new HashTable();
			var values = hashTable.getValues();
			expect(values.length).toEqual(0);
		});
	});

	describe("getValueByKey", function() {
		it(" - should return value if it was added to hash table", function() {
			var hashTable = new HashTable();
			fillHashTable(hashTable, 10);
			var value = hashTable.getValueByKey("3");
			expect(value).toEqual(3);
		});

		it(" - should return value after resize if this value was added to hash table", function() {
			var hashTable = new HashTable();
			fillHashTable(hashTable, 100);
			var value = hashTable.getValueByKey("3");
			expect(value).toEqual(3);
		});

		it(" - should return 'undefined' if value with target key was not added", function() {
			var hashTable = new HashTable();
			fillHashTable(hashTable, 10);
			var value = hashTable.getValueByKey("54");
			expect(value).toBeUndefined();
		});
	});

	describe("clear", function() {
		var hashTable = new HashTable();
		fillHashTable(hashTable, 10);
		hashTable.clear();

		it(" - should set 0 for '_total' property", function() {
			expect(hashTable._total).toEqual(0);
		});

		it(" - should set 0 for 'count' property", function() {
			expect(hashTable.count).toEqual(0);
		});

		it(" - should remove items from bucket array", function() {
			var keys = hashTable.getKeys();
			expect(keys.length).toEqual(0);
		});
	});

	describe("contains", function() {
		var hashTable = new HashTable();
		fillHashTable(hashTable, 10);

		it(" - should return 'true' if value with target key was added", function() {
			expect(hashTable.contains("5")).toEqual(true);
		});

		it(" - should return 'false' if value with target key was not added", function() {
			expect(hashTable.contains("83")).toEqual(false);
		});
	});

	describe("remove", function() {
		var removedItemKey = "3";
		var length = 10;
		var hashTable = new HashTable();
		fillHashTable(hashTable, length);
		hashTable.remove(removedItemKey);

		it(" - should mark target item as removed but do not remove it from array", function() {
			var items = hashTable._items;
			var item;
			for (var i = 0; i < items.length; i++) {
				var temp = items[i];
				if (temp && temp.key === removedItemKey) {
					item = temp;
					break;
				}
			}
			expect(item).toBeDefined();
			expect(item.deleted).toEqual(true);
		});

		it(" - 'contains' should return 'false' for removed item", function() {
			var contains = hashTable.contains(removedItemKey);
			expect(contains).toEqual(false);
		});

		it(" - 'getValueByKey' should return 'undefined' for removed item", function() {
			var value = hashTable.getValueByKey(removedItemKey);
			expect(value).toBeUndefined();
		});

		it(" - should change 'count' property", function() {
			expect(hashTable.count).toEqual(length - 1);
		});

		it(" - should do not change '_total' property", function() {
			expect(hashTable._total).toEqual(length);
		});

		it(" - should nothing change if value with target key was not added", function() {
			var notExistingKey = length + "";
			hashTable.remove(notExistingKey);
			expect(hashTable.count).toEqual(length - 1);
			expect(hashTable._total).toEqual(length);
		});
	});
});