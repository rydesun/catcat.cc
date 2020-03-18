rm -r ./public/*
hugo -D --minify
find ./public -name "*.html" -exec sed -r -i 's/target="?_blank"?/\0 rel="noopener noreferrer"/g' {} +
