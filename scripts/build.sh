#!/bin/bash

code_dark_theme=dracula
font_regular='raw/fonts/sarasa-ui-sc-regular.ttf'
font_bold='raw/fonts/sarasa-ui-sc-bold.ttf'

if [ -d public/fonts ]; then
	old_font=$(ls public/fonts)
else
	old_font=
fi

mkdir -p ./assets/css/vendor/
cp ./themes/hugo-notepadium/assets/css/dark-style.css ./assets/css/vendor/dark-style.scss
cp ./themes/hugo-notepadium/assets/css/chroma/${code_dark_theme}.css ./assets/css/vendor/${code_dark_theme}.scss

if [ -d ./assets/js/build ]; then
	rm -r ./assets/js/build
fi
yarn run build
if [ -f ${font_regular} ] && [ -f ${font_bold} ]; then
	scripts/fontmin.js ${font_regular} ${font_bold}
else
	echo Chinese fonts are missing. >&2
fi

if [ -d ./public ]; then
	rm -r ./public/*
fi
hugo -D --minify

# diff output
(cd public && git status -s)
diff <(echo "$old_font") <(ls public/fonts)
