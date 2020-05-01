var g = require("gulp");
var browserSync = require("browser-sync").create();

function dev() {
  browserSync.init({ server: { baseDir: "./" } });
  g.watch("index.html").on("change", browserSync.reload);
  g.watch("**/*.js").on("change", browserSync.reload);
}

exports.default = dev;
