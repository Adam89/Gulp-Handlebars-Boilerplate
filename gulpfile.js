//	 ____        _ _     _   ____            _       _
//	| __ ) _   _(_) | __| | / ___|  ___ _ __(_)_ __ | |_
//	|  _ \| | | | | |/ _` | \___ \ / __| '__| | '_ \| __|
//	| |_) | |_| | | | (_| |  ___) | (__| |  | | |_) | |_
//	|____/ \__,_|_|_|\__,_| |____/ \___|_|  |_| .__/ \__|
//										      |_|


// --------------------------------------------------------------------------------------------------------------------
// Options
// --------------------------------------------------------------------------------------------------------------------

var languages = ['zm', 'de'];
var startPath = 'index.html';

// --------------------------------------------------------------------------------------------------------------------
// Gulp Libraries
// --------------------------------------------------------------------------------------------------------------------


var info = require('./package.json');                       // Package data
var gulp = require('gulp');									// Gulp
var browserify = require('gulp-browserify');									// bundles javascript modules
var handlebars = require('gulp-handlebars');									// compiles handlebars template files
var sass = require('gulp-sass'); 						// Compile SASS
var browserSync = require('browser-sync'); 					// Open a new browser session and load changes instantly
var del = require('del'); 									// Delete files
var runSequence = require('run-sequence'); 					// Manage async tasks
var changed = require('gulp-changed'); 						// Only affect changed files
var sourcemaps = require('gulp-sourcemaps');				// JS and SASS source maps
var watch = require('gulp-watch');							// Watch for changes to files
var concat = require('gulp-concat'); 						// Concatenate JavaScript files
var uglify = require('gulp-uglify'); 						// Minify Javascript
var jshint = require('gulp-jshint'); 						// Ensuring JavaScript is syntactically correct
var jsonlint = require('gulp-json-lint'); 					// Check for valid JSON markup
var yargs = require('yargs');                               // Access vars set via the console
var mainBowerFiles = require('main-bower-files');			// Get only the main library files
var plumber = require('gulp-plumber');                      // Better error handling
var notify = require('gulp-notify');                        // Popup notifications on screen
var autoprefixer = require('gulp-autoprefixer');            // Add vendor prefixes to CSS
