code_dark_theme=dracula

mkdir -p ./assets/css/vendor/
cp ./themes/hugo-notepadium/assets/css/chroma/${code_dark_theme}.css ./assets/css/vendor/${code_dark_theme}.scss
rm -r ./public/*
hugo -D --minify
