import LinkedList from "linked_list";
import { generateNextPrimeNumber } from "next_prime_number";
import { getHashByCyclicShift } from "hash_functions";
import { compressByDivision } from "comporession_functions";

/**
 * Hash table with chaining.
 * In hashing with chaining, a collision is resolved by allowing more than one element to live at each position in the
 * table. Each entry in the array A is a pointer to the head of a linked list. To insert the value x, we simply append
 * it to the list A[x0]. To search for the element x, we perform a linear search in the list A[x0]. To delete the
 * element x, we search for x in the list A[x0] and splice it out.
 * From start size of bucket array is 101. When we add more than 10 items at one index of bucket array, then we will
 * resize it.
 */
export default class HashTable {
	constructor() {
		this._defaultArraySize = 101;
		this._items = new Array(this._defaultArraySize);
		this.count = 0;
	}
	/**
	 * Returns array of added keys to hash table.
	 * @return {Array} Array of keys.
	 */
	getKeys() {
		var result = [];
		_iterateOverBucketArray(function(node) {
			result.push(node.key);
		}, this._items, this);
		return result;
	}
	/**
	 * Returns array of added values to hash table.
	 * @return {Array} Array of values.
	 */
	getValues() {
		var result = [];
		_iterateOverBucketArray(function(node) {
			result.push(node.value);
		}, this._items, this);
		return result;
	}
	/**
	 * Get value from item with target key.
	 * @param  {String} key Key of item.
	 * @return {Object} Value associated with key.
	 */
	getValueByKey(key) {
		var result;
		var hash = getHash(key, this._items.length);
		var list = this._items[hash];
		if (list) {
			list.each(function(value) {
				if (value.key === key) {
					result = value.value;
				}
			});
		}
		return result;
	}
	/**
	 * Adds new item with target key to HashTable.
	 * @param {String} key Key for value.
	 * @param {Object} value Value for hash table.
	 */
	add(key, value) {
		var hash = getHash(key, this._items.length);
		var item = _generateItem(key, value);
		_insertInBucket(hash, item, this);
		this.count++;
		_resize(this._items[hash].count, this);
	}
	/**
	 * Clears hast table.
	 * @param  {Number} arraySize Optional parameter. Set length of bucket array.
	 */
	clear(arraySize) {
		this.count = 0;
		_clearBucketArray(this);
		this._items = new Array(arraySize || this._items.length);
	}
	/**
	 * Checks if hast table contains element with target key.
	 * @param  {String} key Key to search.
	 * @return {Boolean} True if hash table contains element with target key.
	 */
	contains(key) {
		var result = false;
		var hash = getHash(key, this._items.length);
		var list = this._items[hash];
		if (list) {
			list.each(function(node) {
				if (node.key === key) {
					result = true;
				}
			});
		}
		return result;
	}
	/**
	 * Removes element with target key from hash table.
	 * @param  {String} key Key for removing.
	 */
	remove(key) {
		var hash = getHash(key, this._items.length);
		var list = this._items[hash];
		if (list) {
			var prevLength = list.count;
			_removeFromList(list, key);
			var diff = prevLength - list.count;
			this.count -= diff;
		}
	}
}

/**
 * Goes over all elements in hash table.
 * @param  {Function} callback Callback in which will be sended value of node of linked list from bucket array.
 * @param  {Array} items Bucket array.
 * @param  {HashTable} scope Context.
 */
function _iterateOverBucketArray(callback, items, scope) {
	for (var i = 0; i < items.length; i++) {
		var list = items[i];
		if (list) {
			list.each(function(value) {
				callback.call(scope, value);
			});
		}
	}
}

/**
 * Inserts new item into bucket at target hash. If linked list for target bucket was not created, then we create it.
 * @param  {Number} hash Index of bucket in bucket array.
 * @param  {Object} item Value for bucket.
 * @param  {HashTable} scope Context.
 */
function _insertInBucket(hash, item, scope) {
	var listAtIndex = scope._items[hash];
	if (listAtIndex) {
		listAtIndex.add(item);
	} else {
		var list = new LinkedList();
		list.add(item);
		scope._items[hash] = list;
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
		value: value
	};
}

/**
 * Resizes bucket array of our hast table if linked list contains 10 or more items.
 * @param  {Number} count Length of linked list, in which we added new item.
 * @param  {HashTable} scope Context.
 */
function _resize(count, scope) {
	if (count >= 10) {
		var currentArray = scope._items;
		var newLength = generateNextPrimeNumber(currentArray.length * 2);
		scope.clear(newLength);
		_iterateOverBucketArray(function(node) {
			this.add(node.key, node.value);
		}, currentArray, scope);
	}
}

/**
 * Iterates over bucket array and call 'clear' for each linked list in it.
 * @param  {HashTable} scope Context.
 */
function _clearBucketArray(scope) {
	var items = scope._items;
	for (var i = 0; i < items.length; i++) {
		var list = items[i];
		if (list) {
			list.clear();
		}
	}
}

/**
 * Removes item by key from linked list.
 * @param  {LinkedList} list List, where we should remove item.
 * @param  {String} key  Target key.
 */
function _removeFromList(list, key) {
	list.remove(function(node) {
		return key === node.value.key;
	});
}

/**
 * Computes hash for target key.
 * @param  {String} key String for which we should compute hash.
 * @param  {String} key Lenght of bucket array.
 * @return {Number} Hash value.
 */
function getHash(key, lenghtOfArray) {
	var hash = getHashByCyclicShift(key);
	return compressByDivision(hash, lenghtOfArray);
}
