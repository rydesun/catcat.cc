#!/bin/bash

source ./tools/prebuild.sh

if [ -d ./assets/js/build ]; then
	rm -r ./assets/js/build
fi
yarn run build
if [ -f ${font_regular} ] && [ -f ${font_bold} ]; then
	tools/fontmin.js ${font_regular} ${font_bold}
else
	echo Chinese fonts are missing. >&2
fi

if [ -d ./public ]; then
	rm -r ./public/*
fi
hugo -D --minify

# diff output
(cd public && git status -s)

if [ -d public/fonts ]; then
	diff <(echo "$old_font") <(ls public/fonts)
fi
