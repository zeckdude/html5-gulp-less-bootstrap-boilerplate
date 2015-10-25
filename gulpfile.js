/* ==========================================================================
 Gulp variables
 ========================================================================== */
var less_dir = 'src/less/';
var css_output_dir = 'public/css/';
var js_dir = 'public/js/';


/* ==========================================================================
 Gulp dependencies
 ========================================================================== */
var gulp  = require('gulp'), // Enable Gulp
  gutil = require('gulp-util'), // Gulp Utility Functions
  less = require('gulp-less'), // Compile less files into css file
  autoprefixer = require('gulp-autoprefixer'), // Add browser-specific prefixes to CSS3 rules
  minifycss = require('gulp-minify-css'), // Minify CSS
  rename = require('gulp-rename'), // Rename the outputted file
  notify = require('gulp-notify'), // Output a growl notification to the computer window when the task is complete
  jshint = require('gulp-jshint'), // Output any errors relating to JavaScript mistakes
  uglify = require('gulp-uglify'), // Minify JS
  sourcemaps = require('gulp-sourcemaps'); // Outputs source maps(line numbers) to the code in the appropriate less files


/* ==========================================================================
 Gulp task functions
 ========================================================================== */
gulp.task('styles', function() {
  //Compile the main less file that is importing all the rest
  gulp.src(less_dir + 'styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(rename("main.css"))
    .pipe(gulp.dest(css_output_dir))
    .pipe(notify({ title: 'Compiled CSS file created', message: 'main.css created using Gulp!' }));
});

gulp.task('scripts', function() {
  // Lint the JS file for any errors
  gulp.src(js_dir + 'main.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({ title: 'Linted JS file', message: 'main.js has been linted!' }));
});

gulp.task('production', function() {
  // These are functions that minify the main CSS and JS file. For this test they won't be run so you can properly inspect the output CSS and JS file, but I would usually run them when a site goes live.
    //Minify the CSS file
    gulp.src(css_output_dir + 'main.css')
      .pipe(minifyCss())
      .pipe(gulp.dest(css_output_dir))
      .pipe(notify({title: 'Production CSS file minified', message: 'main.css was minified using Gulp!'}));

    //Minify the JS file
    gulp.src(js_dir + 'main.js')
      .pipe(uglify())
      .pipe(gulp.dest(js_dir))
      .pipe(notify({title: 'Production JS file minified', message: 'main.js was minified using Gulp!'}));
});

gulp.task('watch', function() {
  gulp.watch(less_dir + '**/*.less', ['styles']); // Watch Less files for changes
  gulp.watch(js_dir + 'main.js', ['scripts']); // Watch JS File for changes
});


/* ==========================================================================
 Gulp task calling
 ========================================================================== */
gulp.task('default', ['styles', 'scripts', 'watch']);
gulp.task('production', ['production']);