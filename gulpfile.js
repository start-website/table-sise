"use strict";

const path                    = require('path'),
      gulp                    = require('gulp'),
      sass                    = require('gulp-sass'),
      autoprefixer            = require('autoprefixer'),
      sourcemaps              = require('gulp-sourcemaps'),
      browserSync             = require('browser-sync'),
      rename                  = require('gulp-rename'),
      gcmq                    = require('gulp-group-css-media-queries'),
      csso                    = require('gulp-csso'),
      postcss                 = require('gulp-postcss'),
      ttf2woff                = require('gulp-ttf2woff'),
      ttf2woff2               = require('gulp-ttf2woff2'),
      webpack                 = require('webpack-stream'),
      clean                   = require('gulp-clean'),
      webp                    = require('gulp-webp'),
      cache                   = require('gulp-cache'),
      tinypng                 = require('gulp-tinypng-unlimited');

const babel                   = require("gulp-babel");

const isDev = process.env.NODE_ENV === 'development';

gulp.task('move-dist', function (done) {
  return gulp.src([
    './public/**',
    'src/*.html'
  ])
    .pipe(gulp.dest('./dist'));
})

gulp.task('move-dist-fonts', function (done) {
  return gulp.src([
    './src/fonts/**',
  ])
    .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('move-dist-images', function (done) {
  return gulp.src([
    './src/images/*.mp4',
  ])
    .pipe(gulp.dest('./dist/images'));
})

gulp.task('sass', function () {
  return gulp.src([
    './src/scss/style.scss',
    './src/scss/backend.scss'
  ])
  .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/css'));
});

gulp.task('postcss', function () {
  const plugins = [
    autoprefixer(),
  ];
  return gulp.src('./src/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gcmq())
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('tiny', function() {
  return gulp.src([
    './src/images/**/*.@(png|jpg|jpeg)',
  ])
  .pipe(tinypng())
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('webp', () =>
  gulp.src([
    './src/images/*.jpg',
    './src/images/*.png'
  ])
  .pipe(webp({
    quality: 70,
    preset: 'photo',
    method: 6,
    // lossless: true // Сжатие без потерь
  }))
  .pipe(gulp.dest(isDev ? './src/images' : './dist/images'))
);

// Настройка Webpack
const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    scripts: './src/js/_scripts.js',
    settings: './src/js/_settings.js'
  },
  output: {
    filename: '[name].js',
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
  module: {
    rules: [
      { 
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [['@babel/preset-env', {
          //     corejs: 3,
          //     useBuiltIns: 'usage'
          //   }]]
          // }
        }
      }

    ]
  }
};

// Webpack - сборщик js модулей
gulp.task('webpack', function() {
  return gulp.src([
    './src/js/_scripts.js',
    './src/js/_settings.js'
  ])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(isDev ? './src/js' : './dist/js'));
});

// gulp.task("babel", function () {
//   return gulp.src("src/js/_scripts.js")
//     .pipe(babel())
//     .pipe(rename({
//       //dirname: "main/text/ciao",
//       basename: "scripts",
//       //prefix: "bonjour-",
//       //suffix: "-hola",
//       //extname: ".md"
//     }))
//     .pipe(gulp.dest("src/js"));
// });

gulp.task('browser-sync' , function() { 
  browserSync({
      server: {
          baseDir: 'src'
      },
      //browser: 'Firefox',
      notify: false
  });
});

gulp.task('ttf2woff2', function () {
  gulp.src(['fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('fonts/'));
});

gulp.task('ttf2woff', function () {
  gulp.src(['fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('fonts/'));
});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('cache', function() {
  return cache.clearAll();
});

gulp.task('watch', function() {
  // Наблюдение
  gulp.watch('src/scss/style.scss', gulp.parallel('sass'));  
  gulp.watch('./src/js/_scripts.js', gulp.parallel('webpack'));
  // Обновление страницы
  gulp.watch('src/css/style.css').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload); 
  gulp.watch('src/js/scripts.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'move-dist', 'webpack', 'webp', 'sass', 'browser-sync'));

gulp.task('build', gulp.series('postcss', 'clean', 'sass' ,'postcss', 'move-dist', 'move-dist-fonts', 'move-dist-images', 'tiny', 'webpack', 'webp'));


