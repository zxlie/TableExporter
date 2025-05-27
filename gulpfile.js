const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const zip = require('gulp-zip');

// 定义路径
const paths = {
  html: {
    src: ['app/*.html', '!app/test-page.html'], // 排除 test-page.html
    dest: 'dist/'
  },
  css: {
    src: 'app/*.css',
    dest: 'dist/'
  },
  js: {
    src: ['app/*.js', '!app/gulpfile.js', '!app/exceljs.min.js'], // 排除 gulpfile 和已经压缩的文件
    dest: 'dist/'
  },
  assets: {
    src: ['app/img/**/*', 'app/manifest.json', 'app/exceljs.min.js', 'README.md'],
    dest: 'dist/'
  },
  // Website 发布路径配置
  website: {
    html: {
      src: 'website/**/*.html',
      dest: 'output/'
    },
    css: {
      src: 'website/**/*.css',
      dest: 'output/'
    },
    js: {
      src: 'website/**/*.js',
      dest: 'output/'
    },
    assets: {
      src: ['website/**/*', '!website/**/*.html', '!website/**/*.css', '!website/**/*.js'],
      dest: 'output/'
    }
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
  return gulp.src(paths.assets.src, { base: 'app' })
    .pipe(gulp.dest(paths.assets.dest));
}

// 创建 ZIP 包
function zipBuild() {
  return gulp.src('dist/**/*')
    .pipe(zip('table-reporter-extension.zip'))
    .pipe(gulp.dest('dist/'));
}

// Website 发布相关任务

// 清理 output 目录
function cleanOutput() {
  return del(['output']);
}

// 处理 website HTML 文件
function websiteHtml() {
  return gulp.src(paths.website.html.src, { base: 'website' })
    .pipe(gulp.dest(paths.website.html.dest));
}

// 压缩 website CSS 文件
function websiteCss() {
  return gulp.src(paths.website.css.src, { base: 'website' })
    .pipe(cleanCSS({
      level: 2,
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(paths.website.css.dest));
}

// 压缩 website JavaScript 文件
function websiteJs() {
  return gulp.src(paths.website.js.src, { base: 'website' })
    .pipe(uglify({
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true
      },
      mangle: {
        toplevel: true
      },
      output: {
        comments: false
      }
    }))
    .pipe(gulp.dest(paths.website.js.dest));
}

// 复制 website 其他资源文件
function websiteAssets() {
  return gulp.src(paths.website.assets.src, { base: 'website' })
    .pipe(gulp.dest(paths.website.assets.dest));
}

// 创建 website 发布 ZIP 包
function zipWebsite() {
  return gulp.src('output/**/*')
    .pipe(zip('website.release.zip'))
    .pipe(gulp.dest('./'));
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

// Website 发布任务
const buildWebsite = gulp.series(cleanOutput, gulp.parallel(websiteHtml, websiteCss, websiteJs, websiteAssets));

// Website 发布并打包任务
const release = gulp.series(buildWebsite, zipWebsite);

// 导出任务
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.js = js;
exports.assets = assets;
exports.watch = watch;
exports.build = build;
exports.zip = buildAndZip;
exports.cleanOutput = cleanOutput;
exports.websiteHtml = websiteHtml;
exports.websiteCss = websiteCss;
exports.websiteJs = websiteJs;
exports.websiteAssets = websiteAssets;
exports.buildWebsite = buildWebsite;
exports.release = release;
exports.default = buildAndZip; 
