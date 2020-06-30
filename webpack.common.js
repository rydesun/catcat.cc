const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
    comments: './src/comments.ts',
    menu: './src/menu.ts',
    warnIE: './src/warnIE.js',
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
