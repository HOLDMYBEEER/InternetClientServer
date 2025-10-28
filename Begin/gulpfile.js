// Verwendete Gulp-Module
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Standard Gulp-Task, wird ausgeführt, wenn kein Task als Parameter angegeben wird
gulp.task('default', function() {

    // BrowserSync Konfiguration - Dateien unterhalb von webroot-Verzeichnis ausliefern
    browserSync.init({
        server: "./webroot"
    });

    // Alle Dateien unterhalb von webroot überwachen und bei Änderungen per Browser-Sync neuladen
    gulp.watch("./webroot/**").on('change', browserSync.reload);
});
