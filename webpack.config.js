const helper = require("./webpack/webpack.helper");
const output = require("./webpack/webpack.output");
const rules = require("./webpack/webpack.rules");
const plugins = require("./webpack/webpack.plugins");
const server = require("./webpack/webpack.server");

let config = {
  entry: helper.entry,
  output: output,
  devtool: "source-map",
  // watch: true,//自动更新/编译修改的文件到bound.js
  module: {//webpack2写法，webpack2以后写法不同
    rules: rules
  },
  devServer: server,
  //插件，详细配置参考：https://segmentfault.com/a/1190000007294861
  plugins: plugins
};


module.exports = config;
