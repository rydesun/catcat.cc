const path = require('path');

module.exports = {
  entry: {
    index: './js/index.ts',
    comments: './js/comments.ts',
    menu: './js/menu.ts',
    warnIE: './js/warnIE.js',
  },
  output: {
    path: path.resolve(__dirname, './assets/js/build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};
