var gulp = require("gulp");
var requirejs = require("gulp-requirejs");
var babel = require("gulp-babel");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("clean-temp", function() {
	return del(["es5"]);
});

gulp.task("es6-amd", ["clean-temp"], function() {
	return gulp.src(["js/*.js", "tests/*.js"])
		.pipe(babel({"plugins": ["transform-es2015-modules-amd", "transform-es2015-classes"]}))
		.pipe(gulp.dest("es5/js"));
});

gulp.task("bundle-amd-clean", function() {
	return del(["es5/amd"]);
});

gulp.task("amd-bundle", ["bundle-amd-clean", "es6-amd"], function() {
	var requireConfig = {
		name: "hash_table_linked_list",
		baseUrl: "es5/js",
		out: "hash_table_linked_list.js"
	};
	return requirejs(requireConfig)
		.pipe(gulp.dest("es5/bundle"));
});

gulp.task("default", ["amd-bundle"]);
