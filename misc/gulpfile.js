var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    flatten = require('gulp-flatten'),
    watch = require('gulp-watch'),
    angularOrder = require('gulp-angular-order'),
    uglifycss = require('gulp-uglifycss'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    fs = require('fs');


    //function defaultTask(cb) {
        // place code for your default task here
      //  cb();
    //  }

    //injecting css and js into main html file and renaming to index.html
    gulp.task('injectDev', async function(){
        var target = gulp.src("Application/modules/app/client/views/home.html");
        var sources = gulp.src(["Application/modules/**/client/**/*.css", "Application/modules/**/client/**/*.js"], {read:false});
        
        return target.pipe(inject(sources))
            .pipe(angularOrder())
            .pipe(rename("index.html"))
            .pipe(gulp.dest('Application/modules/app/client/views/'));
    });

    //injecting css and js into main html file and renaming to index.html
    gulp.task('injectProd', async function(){
        var target = gulp.src("Application/modules/app/client/views/home.html");
        var sources = gulp.src(["dist/public/**/*.css", "dist/public/**/*.js"], {read:false});
        
        return target.pipe(inject(sources))
            .pipe(rename("index.html"))
            .pipe(gulp.dest('Application/modules/app/client/views/'));
    }); 

    //Compiles scss to css
    gulp.task('scss', function(){
        //1.var pathstart = 'Application/modules/';
        //1.var sassFiles = pathstart+"**/client/styles/scss/*.scss";
        var sassFiles = "Application/modules/**/client/styles/scss/*.scss";
        return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        //next step needed to find relative path per folder for css destination
        .pipe(rename(function (path) {
            var temp = path.dirname.slice(0, -4);
            console.log('temp'+temp);
            //1.path.dirname = pathstart+temp;
            path.dirname = temp;
         }))
     
         .pipe(gulp.dest('./Application/modules/'));
    });

    gulp.task('sass:watch', function () {
        gulp.watch('Application/modules/**/client/styles/scss/*.scss', gulp.series('scss'));
      });

    //Copy all html files
    gulp.task('prepHtml', async function(){
        gulp.src('application/modules/*/client/views/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist/public/views'));
    });

    gulp.task('prepCss', function() {
        return gulp.src("Application/modules/app/client/**/*.css")
            .pipe(concat('main.css'))
            .pipe(autoprefixer({cascade: false}))
            .pipe(uglifycss())
            .pipe(gulp.dest('./dist/public/styles'));
        });

    gulp.task('prepJS', function() {
        return gulp.src("Application/modules/app/client/**/*.js")
            .pipe(angularOrder())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/public/js'));
      });
      
    //Copy all JS files dev
    gulp.task('moveJs', async function(){
        gulp.src('application/modules/**/client/*/*.js')
        .pipe(gulp.dest('Application/public/js'));
    });

    //Copy all CSS files dev
    gulp.task('moveCss', async function(){
        gulp.src('application/modules/**/client/**/*.css')
        .pipe(gulp.dest('Application/public/styles'));
    });

    //Copy all HTML files dev
    gulp.task('moveHtml', async function(){
        gulp.src('application/modules/**/client/**/*.html')
        .pipe(gulp.dest('Application/public/views'));
    });

    gulp.task('default', gulp.parallel(['sass:watch']));
    gulp.task('dev', gulp.parallel(['scss', 'moveJs', 'moveCss', 'moveHtml', 'injectDev']));
    gulp.task('prod', gulp.series(['scss', 'prepHtml', 'prepCss', 'prepJS', 'injectProd']));

    //Check if inject work properly at gulp prod
