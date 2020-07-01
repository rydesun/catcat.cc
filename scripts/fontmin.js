#! /usr/bin/env node

const Fontmin = require('fontmin');
const fs = require('fs');
const glob = require("glob");

// fix some characters
extraText = '月'

var files = [];
for (p of ["content/**/*.md",
           "content/**/*.html",
           "layouts/**/*.html",
           "assets/css/*",
           "assets/css/vendor/*",
           "assets/js/**/*.js"]) {
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
  .src(['raw/fonts/sarasa-ui-sc-regular.ttf',
        'raw/fonts/sarasa-ui-sc-bold.ttf'])
  .dest('assets/fonts')
  .use(Fontmin.glyph({text: content}))
  .use(Fontmin.ttf2woff2());

fontmin.run(function (err) {
    if (err) {
        throw err;
    }
});
