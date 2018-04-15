# webpack
webpack、babel基本使用方法

# webpack的安装
### 1、在项目目录执行：
```bash
// 如果没有初始化项目，没有package.json，需要初始化
npm init
npm install
npm install --save-dev webpack
```
### 2、在项目目录创建文件：webpack.config.js

### 3、在文件webpack.config.js中写入配置


# webpack4个核心配置：
### 入口(entry)
入口配置

### 输出(output)
输出文件配置

```javascript
const path = require('path');

module.exports = {
// 入口文件：需要进行打包整合的文件路径
  entry: './src/index.js',
// path指输出文件路径
// filename指输出文件名
// __dirname表示当前路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-webpack.bundle.js'
  }
};
```

### loader
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。

### 插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```



