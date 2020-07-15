#!/bin/bash

code_dark_theme=dracula

old_font=$(ls public/fonts)

font_regular='raw/fonts/sarasa-ui-sc-regular.ttf'
font_bold='raw/fonts/sarasa-ui-sc-bold.ttf'

mkdir -p ./assets/css/vendor/
cp ./themes/hugo-notepadium/assets/css/dark-style.css ./assets/css/vendor/dark-style.scss
cp ./themes/hugo-notepadium/assets/css/chroma/${code_dark_theme}.css ./assets/css/vendor/${code_dark_theme}.scss
rm -r ./assets/js/build
yarn run build
if [ -f ${font_regular} ] && [ -f ${font_bold} ]; then
	scripts/fontmin.js ${font_regular} ${font_bold}
else
	echo Chinese fonts are missing. >&2
fi
rm -r ./public/*
hugo -D --minify

# diff output
(cd public && git status -s)
diff <(echo "$old_font") <(ls public/fonts)
