import { generateNextPrimeNumber } from "next_prime_number";
import { getHashByCyclicShift } from "hash_functions";
import { compressByDivision } from "comporession_functions";

/**
 * Hash table with open addressing.
 * Hashing with open addressing differs from hashing with chaining in that each table position A[i] is allowed to store
 * only one value. When a collision occurs at table position i, one of the two elements involved in the collision must
 * move on to the next element in its probe sequence.
 * To search for an element x in the hash table we look for x at positions A[x0], A[x1], A[x2], and so on until we
 * either (1) find x, in which case we are done or (2) find an empty table position A[xi] that is not marked as deleted,
 * in which case we can be sure that x is not stored in the table (otherwise it would be stored at position xi). To
 * delete an element x from the hash table we first search for x. If we find x at table location A[xi] we then simply
 * mark A[xi] as deleted. To insert a value x into the hash table we examine table positions A[x0], A[x1], A[x2], and
 * so on until we find a table position A[xi] that is either empty or marked as deleted and we store the value x in
 * A[xi].
 * From start size of bucket array is 101. When we add more than 80% of bucket array length (deleted but not replaced
 * also counts), then we will resize it.
 */
export default class HashTable {
	constructor() {
		this._defaultArraySize = 101;
		this._items = new Array(this._defaultArraySize);
		this.count = 0;
		this._total = 0;
	}
	/**
	 * Returns array of added keys to hash table.
	 * @return {Array} Array of keys.
	 */
	getKeys() {
		var result = [];
		_iterateOverNotRemovedItems(function(item) {
			result.push(item.key);
		}, this);
		return result;
	}
	/**
	 * Returns array of added values to hash table.
	 * @return {Array} Array of values.
	 */
	getValues() {
		var result = [];
		_iterateOverNotRemovedItems(function(item) {
			result.push(item.value);
		}, this);
		return result;
	}
	/**
	 * Get value from item with target key.
	 * @param  {String} key Key of item.
	 * @return {Object} Value associated with key.
	 */
	getValueByKey(key) {
		var result;
		_iterateOverItemsAtKey(key, function(item) {
			if (!item) {
				return true;
			} else if (!item.deleted && item.key === key) {
				result = item.value;
				return true;
			}
		}, this);
		return result;
	}
	/**
	 * Adds new item with target key to HashTable.
	 * @param {String} key Key for value.
	 * @param {Object} value Value for hash table.
	 */
	add(key, value) {
		var items = this._items;
		var index;
		_iterateOverItemsAtKey(key, function(item, itemIndex) {
			if (!item || item.deleted) {
				index = itemIndex;
				return true;
			}
		}, this);
		if (!index) {
			_resize(true, this);
			this.add(key, value);
		} else {
			if (!items[index]) {
				this._total++;
			}
			items[index] = _generateItem(key, value, this);
			this.count++;
		}
		_resize(false, this);
	}
	/**
	 * Clears hast table.
	 * @param  {Number} arraySize Optional parameter. Set length of bucket array.
	 */
	clear(arraySize) {
		this.count = 0;
		this._total = 0;
		this._items = new Array(arraySize || this._items.length);
	}
	/**
	 * Checks if hast table contains element with target key.
	 * @param  {String} key Key to search.
	 * @return {Boolean} True if hash table contains element with target key.
	 */
	contains(key) {
		var result = false;
		_iterateOverItemsAtKey(key, function(item) {
			if (!item) {
				return true;
			} else if (!item.deleted && item.key === key) {
				result = true;
				return true;
			}
		}, this);
		return result;
	}
	/**
	 * Removes element with target key from hash table.
	 * @param  {String} key Key for removing.
	 */
	remove(key) {
		var callback = function(item, itemIndex) {
			if (!item) {
				return true;
			} else if (item.key === key) {
				item.deleted = true;
				this.count--;
				return true;
			}
		}.bind(this);
		_iterateOverItemsAtKey(key, callback, this);
	}
	/**
	 * Computes hash for target key.
	 * @param  {String} key String for which we should compute hash.
	 * @return {Number} Hash value.
	 */
	getHash(key) {
		var hash = getHashByCyclicShift(key);
		return compressByDivision(hash, this._items.length);
	}
}

/**
 * Iterates over all not removed elements in bucket array and calls callback with sending each item to it.
 * @param  {Function} callback Function for handling items from bucket array.
 * @param  {HashTable} scope Context.
 */
function _iterateOverNotRemovedItems(callback, scope) {
	var items = scope._items;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item && !item.deleted) {
			callback.call(scope, item);
		}
	}
}

/**
 * Iterates over bucket array from index which we get by computing hash for target key.
 * @param  {String}   key      Target key.
 * @param  {Function} callback Function which we will call for each element from index of hash code. If callback
 * returns true, then we will break iteration.
 * @param  {HashTable} scope Context.
 */
function _iterateOverItemsAtKey(key, callback, scope) {
	var hash = scope.getHash(key);
	var items = scope._items;
	for (var i = hash; i < items.length; i++) {
		if (callback.call(scope, items[i], i)) {
			break;
		}
	}
}

/**
 * Generates item which will be stored in list inside of bucket array.
 * @param {String} key Key for value.
 * @param {Object} value Value for hash table.
 * @return {Object} Item for list.
 */
function _generateItem(key, value) {
	return {
		key: key,
		value: value,
		deleted: false
	};
}

/**
 * Resizes bucket array of our hast table if load factor is more then 80% or 'shouldResizeNow' is 'true'.
 * @param  {Boolean} shouldResizeNow Optional parameter. If we should resize bucket array in any way, then it should be
 * true.
 * @param  {HashTable} scope Context.
 */
function _resize(shouldResizeNow, scope) {
	var loadFactor = (scope._total / scope._items.length) * 100;
	if (shouldResizeNow || loadFactor >= 80) {
		var currentArray = scope._items;
		var newLength = generateNextPrimeNumber(currentArray.length * 2);
		scope.clear(newLength);
		for (var i = 0; i < currentArray.length; i++) {
			var item = currentArray[i];
			if (item && !item.deleted) {
				scope.add(item.key, item.value);
			}
		}
	}
}
