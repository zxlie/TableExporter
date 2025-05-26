const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const zip = require('gulp-zip');

// 定义路径
const paths = {
  html: {
    src: ['*.html', '!test-page.html'], // 排除 test-page.html
    dest: 'dist/'
  },
  css: {
    src: '*.css',
    dest: 'dist/'
  },
  js: {
    src: ['*.js', '!gulpfile.js', '!exceljs.min.js'], // 排除 gulpfile 和已经压缩的文件
    dest: 'dist/'
  },
  assets: {
    src: ['img/**/*', 'manifest.json', 'exceljs.min.js', 'README.md'],
    dest: 'dist/'
  }
};

// 清理构建目录
function clean() {
  return del(['dist']);
}

// 复制 HTML 文件（不压缩）
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

// 压缩 CSS 文件
function css() {
  return gulp.src(paths.css.src)
    .pipe(cleanCSS({
      level: 2, // 更高级别的优化
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(paths.css.dest));
}

// 压缩 JavaScript 文件
function js() {
  return gulp.src(paths.js.src)
    .pipe(uglify({
      compress: {
        drop_console: true, // 移除 console 语句
        drop_debugger: true, // 移除 debugger 语句
        dead_code: true,
        unused: true
      },
      mangle: {
        toplevel: true // 混淆顶层作用域的变量名
      },
      output: {
        comments: false // 移除注释
      }
    }))
    .pipe(gulp.dest(paths.js.dest));
}

// 复制其他资源文件（图片、manifest、已压缩的库等）
function assets() {
  return gulp.src(paths.assets.src, { base: '.' })
    .pipe(gulp.dest(paths.assets.dest));
}

// 创建 ZIP 包
function zipBuild() {
  return gulp.src('dist/**/*')
    .pipe(zip('table-reporter-extension.zip'))
    .pipe(gulp.dest('.'));
}

// 监听文件变化
function watch() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.assets.src, assets);
}

// 构建任务
const build = gulp.series(clean, gulp.parallel(html, css, js, assets));

// 构建并打包任务
const buildAndZip = gulp.series(build, zipBuild);

// 导出任务
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.js = js;
exports.assets = assets;
exports.watch = watch;
exports.build = build;
exports.zip = buildAndZip;
exports.default = buildAndZip; 