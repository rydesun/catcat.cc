const path = require('path');

module.exports = {
  entry: {
    index: './js/index.ts',
    comments: './js/comments.ts',
    menu: './js/menu.ts',
    warnIE: './js/warnIE.js',
    graphviz: {
      import: './node_modules/d3-graphviz/index.js',
      library: {
        type: 'global',
      },
    },
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
