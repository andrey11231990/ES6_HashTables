# ES6_HashTables
Here is example of using ES6 with 'gulp' and 'babel'. For module realisation I used 'gulp-requirejs' plugin. For proper work of 'Jasmine' and 'requirejs' I have created file 'requirejs/main.js' which contains 'path' and 'shim' for jasmine libraries and requires target files with tests

The code taken from 'https://github.com/andrey11231990/algorithms/tree/master/hash'

To make it works you should install next packages
- gulp
- gulp-babel
- transform-es2015-modules-amd
- transform-es2015-classes
- gulp-uglify
- del
- requirejs
- gulp-requirejs

About project hierarchy:
- tests - folder with tests
- js - folder with source code
- requirejs - files to work with requirejs
- jasmine-2.4.1 - libraries for Jasmine
- es5 - here will be placed files, created by gulp
- gulpfile.js - configuration file for gulp
- SpecRunner.html - html page to work with Jasmine tests

From console you should run default task from gulpfile.js.
