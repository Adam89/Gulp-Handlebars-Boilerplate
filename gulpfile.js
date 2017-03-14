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


var info = require('./package.json'); // Package data
var gulp = require('gulp'); // Gulp
var assemble = require('assemble'); // compiles handlebars template files
var yargs = require('yargs'); // Access vars set via the console
var htmlmin = require('gulp-htmlmin') // html minify
var plumber = require('gulp-plumber'); // Better error handling
/*
var browserify = require('gulp-browserify'); // bundles javascript modules
var htmlmin = require('gulp-htmlmin') // html minify
var extname = require('gulp-extname') // dynamically rewrite dest extensions based on src extensions.
var sass = require('gulp-sass'); // Compile SASS
var browserSync = require('browser-sync'); // Open a new browser session and load changes instantly
var del = require('del'); // Delete files
var runSequence = require('run-sequence'); // Manage async tasks
var changed = require('gulp-changed'); // Only affect changed files
var sourcemaps = require('gulp-sourcemaps'); // JS and SASS source maps
var watch = require('gulp-watch'); // Watch for changes to files
var concat = require('gulp-concat'); // Concatenate JavaScript files
var uglify = require('gulp-uglify'); // Minify Javascript
var jshint = require('gulp-jshint'); // Ensuring JavaScript is syntactically correct
var jsonlint = require('gulp-json-lint'); // Check for valid JSON markup
var mainBowerFiles = require('main-bower-files'); // Get only the main library files
var plumber = require('gulp-plumber'); // Better error handling
var notify = require('gulp-notify'); // Popup notifications on screen
var autoprefixer = require('gulp-autoprefixer'); // Add vendor prefixes to CSS

*/
// --------------------------------------------------------------------------------------------------------------------
// Directory
// --------------------------------------------------------------------------------------------------------------------

var dir = { source: {}, library: {}, build: {}, assets: {}, binary: {} };

// SOURCE -------------------------------------------------
dir.source.root = 'src';
dir.source.locale = '/locale';
dir.source.js = dir.source.root + '/js';
dir.source.json = dir.source.root + '/json';
dir.source.templates = dir.source.root + '/templates';
dir.source.layouts = dir.source.templates + '/layouts';
dir.source.pages = dir.source.templates + '/pages';
dir.source.partials = dir.source.templates + '/partials';
dir.source.sass = dir.source.root + '/scss';
dir.source.images = dir.source.root + '/images';
dir.source.fonts = dir.source.root + '/fonts';



// LIBRARY ------------------------------------------------
dir.library.bower = 'bower_components';
dir.library.npm = 'node_modules';
dir.library.js = [dir.library.bower + '/handlebars/handlebars.js'];

// Build -------------------------------------------------
dir.build.root = 'build';
dir.build.js = dir.build.root + '/js';
dir.build.json = dir.build.root + '/json';
dir.build.templates = dir.build.root;
dir.build.sass = dir.build.root + '/css';
dir.build.images = dir.build.root + '/images';
dir.build.fonts = dir.build.root + '/fonts';


// --------------------------------------------------------------------------------------------------------------------
// Utils
// --------------------------------------------------------------------------------------------------------------------

var cc = {
    cyan: '\033[0;36m',
    yellow: '\033[0;33m',
    pink: '\033[0;35m',
    clear: '\033[0m'
};

/**
 * Report Change
 * @param {{path:String, type:String}} event
 */
function reportChange(event) {
    console.log('File ' + cc.pink + event.path + cc.clear + ' was ' + cc.cyan + event.type + cc.clear + ' running tasks...');
}

/**
 * Error Handler
 * @param error
 */
function errorHandler(error) {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
}


gulp.task('scripts', function() {
    console.log('it worked');
});

// --------------------------------------------------------------------------------------------------------------------
// Gulp Tasks
// --------------------------------------------------------------------------------------------------------------------

// GET OPTIONS --------------------------------------------
gulp.task('options', function() {
    yargs
        .demand(['l', 'b', 'o'])
        .help('help')
        .alias({
            'l': 'lang',
            'b': 'browser',
            'o': 'open',
            'h': 'help'
        })
        .describe({
            'l': 'Set the locale',
            'b': 'Set the default browser',
            'o': 'Open the default browser'
        })
        .choices({
            'l': languages
        })
        .default({
            'l': 'zm',
            'b': 'default',
            'o': false
        })
        .argv;
});

// SASS ---------------------------------------------------
gulp.task('sass', function() {
    var settings = {
        precision: 6,
        stopOnError: true,
        sourcemap: true,
        cacheLocation: './.sass-cache',
        style: 'compressed' // compressed, compact, expanded, nested
    };

    return sass(dir.source.sass + dir.source.locale + '/' + yargs.argv.l + '/app.scss', settings)
        .pipe(plumber({ errorHandler: errorHandler }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.build.css))
        .pipe(browserSync.reload({ stream: true }));
});


// HTML ---------------------------------------------------


gulp.task('assemble', function() {
  //Set main assemble options
  assemble.option('layout', 'default.hbs');
  assemble.partials(dir.source.partials + "/*.hbs");
  assemble.layouts(dir.source.layouts);
  assemble.pages(dir.source.pages + '**/*.hbs');
  assemble.data([dir.source.json + '/*.json', dir.source.json + '/' + yargs.argv.l + '/**/*.json']);

  // push "pages" collection into stream
  return assemble.toStream('pages')
      // render pages with default engine (handlebars)
      .pipe(assemble.renderFile())
      .pipe(plumber())
      .pipe(htmlmin())
      // specify your output
      .pipe(assemble.dest(dir.build.root));
});


// --------------------------------------------------------------------------------------------------------------------
// default task
// --------------------------------------------------------------------------------------------------------------------

gulp.task('default', ['scripts']);
