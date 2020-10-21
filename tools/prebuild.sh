code_light_theme=friendly
code_dark_theme=solarized-dark
font_regular='raw/fonts/sarasa-ui-sc-regular.ttf'
font_bold='raw/fonts/sarasa-ui-sc-bold.ttf'

if [ -d public/fonts ]; then
	old_font=$(ls public/fonts)
else
	old_font=
fi

_SRC_CSS_DIR=./themes/hugo-notepadium/assets/css
_DEST_CSS_DIR=./assets/css/vendor

if [ -d ${_DEST_CSS_DIR} ]; then
	rm -r ${_DEST_CSS_DIR}
fi
mkdir -p ${_DEST_CSS_DIR}

cp ${_SRC_CSS_DIR}/style.css ${_DEST_CSS_DIR}/style.scss
cp ${_SRC_CSS_DIR}/normalize.css ${_DEST_CSS_DIR}/normalize.scss
cp ${_SRC_CSS_DIR}/dark-style.css ${_DEST_CSS_DIR}/dark-style.scss
cp ${_SRC_CSS_DIR}/chroma/${code_light_theme}.css ${_DEST_CSS_DIR}/chroma-${code_light_theme}.scss
cp ${_SRC_CSS_DIR}/chroma/${code_dark_theme}.css ${_DEST_CSS_DIR}/chroma-${code_dark_theme}.scss

