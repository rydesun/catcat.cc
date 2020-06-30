#!/bin/bash

code_dark_theme=dracula

old_font=$(ls public/fonts)

mkdir -p ./assets/css/vendor/
cp ./themes/hugo-notepadium/assets/css/dark-style.css ./assets/css/vendor/dark-style.scss
cp ./themes/hugo-notepadium/assets/css/chroma/${code_dark_theme}.css ./assets/css/vendor/${code_dark_theme}.scss
rm -r ./assets/js/build
yarn run build
(node fontmin.js)
rm -r ./public/*
hugo -D --minify

# diff output
(cd public && git status -s)
diff <(echo "$old_font") <(ls public/fonts)
