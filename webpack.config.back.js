const path = require("path");

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my.bundle.js",
    publicPath: "/dist/"//server.js中webpack-dev-middleware插件使用 
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
      },
    ],
  },
};
