# webpack
webpack、babel基本使用方法，详细参考：https://www.webpackjs.com/concepts/

# webpack的安装
### 1、在项目目录执行：
```bash
// 如果没有初始化项目，没有package.json，需要初始化
npm init
npm install
npm install --save-dev webpack
```
### 2、在项目目录创建文件：webpack.config.js

### 3、在文件webpack.config.js中写入配置<br/>


# webpack4个核心配置：
### 1、入口(entry)
入口配置

### 2、输出(output)
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

### 3、loader
loader 让 webpack 可以预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。。<br/>
loader 详细列表参考：https://www.webpackjs.com/loaders/ <br/>
module.rules 允许你在 webpack 配置中指定多个 loader。 例如：
```javascript
// npm install --save-dev css-loader
// npm install --save-dev ts-loader
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

### 4、插件(plugins)
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

# 安装webpack启动工具
1、安装命令：npm install webpack-cli --save-dev<br/>
2、先不安装，在执行webpack时会提示是否安装，选择yes即可。
```bash
[ymc@yangmaohaodeMBP /Users/ymc/Desktop/文档/projects/webpack$]webpack
The CLI moved into a separate package: webpack-cli
Would you like to install webpack-cli? (That will run npm install -D webpack-cli) (yes/NO)yes
```

# webpack结合babel编译es6：
### 1、需要安装的babel插件
* 正常的es6编码通常需要以下两种插件：<br/>
```bash
npm install babel-loader babel-core babel-preset-env --save-dev <br/>
```
babel-loader<br/>
babel-core<br/>
babel-preset-env<br/>

babel-preset-env，为最新的版本，替换了babel-preset-es2015<br/>
babel-preset-es2015<br/>
预设 babel-preset 系列打包了一组插件，类似于餐厅的套餐。如 babel-preset-es2015 打包了 es6 的特性，babel-preset-stage-0 打包处于 strawman 阶段的语法

* 其它的babel相关插件：
babel-cli<br/>
babel-polyfill<br/>
babel-runtime<br/>
babel-plugin-transform-runtime<br/>

查看安装：在packege.json中出现了如下配置
```bash
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "webpack": "^4.5.0"
  }
```

### 2、在webpack.config.js中添加配置
babel的options参考：https://babeljs.io/docs/usage/api/#options
```javascript
  // module.rules 允许你在 webpack 配置中指定多个 loader。
  // babel-preset-env为最新的版本，替换了babel-preset-es2015，babel-preset-env replaces es2015, es2016, es2017 and latest，参考：https://babeljs.io/docs/plugins/#presets
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"], //List of presets (a set of plugins) to load and use.
            plugins: []
          }
        }
      }
    ]
  }
```

### 3、.babelrc文件的配置
（1）babel的配置可以在webpack.config.js完成
（2）如果项目过大，可以单独配置.babelrc文件
（3）babel的配置都需要写在webpack.config.js文件options中或者.babelrc 文件中
在我们告诉 Babel 该做什么之前，你需要做的就是在项目的根路径下创建 .babelrc 文件。然后输入以下内容作为开始：
```javascript
{
  "presets": [],
  "plugins": []
}
```
这个文件就是用来让 Babel 做你要它做的事情的配置文件。
例如，安装babel-preset-env后，配置：
```javascript
{
  "presets": ["env"],
  "plugins": []
}
```

# webpack 执行
1、在项目目录执行：webpack
2、查看webpack执行进度：webpack --progress
3、监视文件变化：webpack --watch，也可以在webpack.config.js里面写入配置：
```javascript
  // 监控文件修改
  watch: false,
```



























