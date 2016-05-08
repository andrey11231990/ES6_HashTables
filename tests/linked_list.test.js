import LinkedList from "linked_list";

describe("LinkedList", function() {
	var fillList = function(list, length) {
		for (var i = 0; i < length; i++) {
			list.add(i);
		}
	};

	describe(" - add", function() {
		it(" - should add new node at head of the list", function() {
			var list = new LinkedList();
			for (var i = 0; i < 5; i++) {
				list.add(i);
				expect(list.head.value).toEqual(i);
				expect(list.count).toEqual(i + 1);
			}
		});
	});

	describe(" - reverse", function() {
		it(" - should reverse order of elements in list", function() {
			var list = new LinkedList();
			fillList(list, 5);
			list.reverse();
			var count = 0;
			var node = list.head;
			while(node) {
				expect(node.value).toEqual(count);
				node = node.next;
				count++;
			}
		});
	});

	describe(" - each", function() {
		it(" - should call callback for each element in list", function() {
			var list = new LinkedList();
			var length = 5;
			fillList(list, length);
			list.each(function(value) {
				expect(value).toEqual(--length);
			});
		});
	});

	describe(" - remove", function() {
		it(" - should remove item from list with target value", function() {
			var list = new LinkedList();
			var length = 5;
			fillList(list, length);
			list.remove(function(node) {
				return node.value === 2;
			});
			expect(list.count).toEqual(length - 1);
			var items = [];
			list.each(function(value) {
				items.push(value);
			});
			expect(items).toEqual(jasmine.arrayContaining([0, 1, 3, 4]));
		});

		it(" - should change nothing if item does not exist", function() {
			var list = new LinkedList();
			var length = 5;
			fillList(list, length);
			list.remove(function(node) {
				return node.value === 6;
			});
			expect(list.count).toEqual(length);
			var items = [];
			list.each(function(value) {
				items.push(value);
			});
			expect(items).toEqual(jasmine.arrayContaining([0, 1, 2, 3, 4]));
		});
	});

	describe(" - clear", function() {
		it(" - should clear list", function() {
			var list = new LinkedList();
			var length = 5;
			fillList(list, length);
			list.clear();
			expect(list.count).toEqual(0);
			expect(list.head).toBeNull();
		});
	});
});