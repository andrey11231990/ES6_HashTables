requirejs.config({
	baseUrl: "es5/js",
	paths: {
		"jasmine": ["../../jasmine-2.4.1/jasmine"],
		"jasmine-html": ["../../jasmine-2.4.1/jasmine-html"],
		"jasmine-boot": ["../../jasmine-2.4.1/boot"]
	},
	shim: {
		"jasmine-html": {
			deps: ["jasmine"]
		},
		"jasmine-boot": {
			deps: ["jasmine", "jasmine-html"]
		}
	}
});

require(["jasmine-boot"], function () {
	require([
		"comporession_functions.test",
		"hash_functions.test",
		"next_prime_number.test",
		"linked_list.test",
		"hash_table_linked_list.test",
		"hash_table_open_addressing.test"
		], function(){
		//trigger Jasmine
		window.onload();
	});
});
