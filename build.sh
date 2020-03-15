hugo -D
find ./public -name "*.html" -exec sed -r -i '/<a href="[^"]+" *target="_blank">/ s/target="_blank"/\0 rel="noopener noreferrer"/g' {} +
