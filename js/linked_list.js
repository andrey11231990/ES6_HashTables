/**
 * Node of linked list.
 * @param {Object} value Value of node.
 */
class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
	/**
	 * Calls destroy for value of node, if this method is defined. Also clears properties of node.
	 * @return {[type]} [description]
	 */
	destroy() {
		if (this.value.destroy) {
			this.value.destroy();
		}
		this.value = null;
		this.next = null;
	}
}

/**
 * Linked list.
 */
export default class LinkedList {
	constructor() {
		this.head = null;
		this.count = 0;
	}
	/**
	 * Reverses elements in linked list.
	 */
	reverse() {
		var current = this.head;
		while(current) {
			var prev = this.head;
			this.head = current;
			current = current.next;
			if (this.head !== prev) {
				this.head.next = prev;
			} else {
				this.head.next = null;
			}
		}
	}
	/**
	 * Adds new node to list.
	 * @param {Object} value New value.
	 */
	add(value) {
		var node = new Node(value);
		node.next = this.head;
		this.head = node;
		this.count++;
	}
	/**
	 * Iterates over each value in linked list.
	 * @param  {Function} callback Function in which we will send value of each node.
	 */
	each(callback) {
		var node = this.head;
		while (node) {
			callback(node.value);
			node = node.next;
		}
	}
	/**
	 * Removes elements from list for which function 'compare' returns 'true'.
	 * @param  {Function} compare Function, which should return 'true' for items, which we should remove from list.
	 */
	remove(compare) {
		var node = this.head;
		var prev = this.head;
		while(node) {
			var current = node;
			node = node.next;
			if (compare(current)) {
				replaceLinkFromPreviousNode(current, prev, this);
				current.destroy();
				this.count--;
			} else {
				prev = current;
			}
		}
	}
	/**
	 * Clears linked list.
	 */
	clear() {
		var node = this.head;
		while (node) {
			var temp = node;
			node = temp.next;
			temp.destroy();
		}
		this.head = null;
		this.count = 0;
	}
}

/**
 * Replaced link from parent node to current node on next node in list.
 * @param  {Node} node Node for removing.
 * @param  {Node} prev Previous node.
 * @param  {LinkedList} scope Current linked list.
 */
function replaceLinkFromPreviousNode(node, prev, scope) {
	var temp = node;
	if (scope.head === temp) {
		scope.head = node.next;
	} else {
		prev.next = node.next;
	}
}
