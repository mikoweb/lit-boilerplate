import Path from './gulp/path.js';
import gulp from 'gulp';
import {logError, default as bundleSass} from './gulp/gulp-sass.js';
import styleModules from 'gulp-polymer-styles';
import gulpSass from 'gulp-sass';
import sass from 'sass';

import template from 'gulp-template';
import fs from 'fs';

gulp.task('sass-main', () => {
    return bundleSass(Path.style('/index.scss'), 'style.css');
});

gulp.task('modularize-styles', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(gulpSass(sass)({
            outputStyle: 'compressed',
        }).on('error', logError))
        .pipe(styleModules())
        .pipe(gulp.dest('./src'));
});

gulp.task('shared-styles-build', () => {
    return bundleSass(Path.style('/shared-styles.scss'), 'shared-styles.css');
});

gulp.task('shared-styles', gulp.series('shared-styles-build', () => {
    return gulp.src('./gulp/template/shared-styles.js')
        .pipe(template({css: fs.readFileSync(Path.bundle('/shared-styles.css'), {encoding: 'utf8'})
                .trim()
                .replace(/\\/gm, '\\\\')}))
        .pipe(gulp.dest('./src/style-modules'));
}));

gulp.task('dist', gulp.series('sass-main', 'modularize-styles'));

// Watchers

gulp.task('watch:sass', () => {
    return gulp.watch(Path.style('/**/*.scss'), gulp.series('sass-main', 'shared-styles'));
});

gulp.task('watch:modularize-styles', () => {
    return gulp.watch('./src/**/*.scss', gulp.series('modularize-styles'));
});

gulp.task('watch', gulp.parallel('watch:sass', 'watch:modularize-styles'));
