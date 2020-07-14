#! /usr/bin/env node

const Fontmin = require('fontmin');
const fs = require('fs');
const glob = require("glob");

var fontRegular = 'raw/fonts/sarasa-ui-sc-regular.ttf'
var fontBold = 'raw/fonts/sarasa-ui-sc-bold.ttf'
// fix some characters
extraText = '月'
fileSources = ["content/**/*.md",
    "content/**/*.html",
    "layouts/**/*.html",
    "assets/css/*",
    "assets/css/vendor/*",
    "assets/js/**/*.js"]

var files = [];
for (p of fileSources) {
  files.push(...glob.sync(p));
}

var content;
for (f of files) {
  if (!fs.lstatSync(f).isFile()) {
    continue;
  }
  content += fs.readFileSync(f, 'utf8');
}
content += extraText;

var fontmin = new Fontmin()
  .src([fontRegular, fontBold])
  .dest('assets/fonts')
  .use(Fontmin.glyph({text: content}))
  .use(Fontmin.ttf2woff2());

fontmin.run(function (err) {
    if (err) {
        throw err;
    }
});
