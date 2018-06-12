# webpack
webpack、babel基本使用方法，详细参考：https://www.webpackjs.com/concepts/

[1、webpack的安装](#webpack的安装)<br/>
[2、webpack4个核心配置](#webpack4个核心配置)<br/>
[3、webpack启动工具：webpack-cli](#webpack启动工具)<br/>
[4、webpack结合babel编译es6](#webpack结合babel编译es6)<br/>
[5、webpack执行](#webpack执行)<br/>
[6、webpack常用打包](#webpack常用打包)<br/>
[7、webpack示例配置代码](#webpack示例配置代码)<br/>

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
入口配置<br/>

* 1、多文件入口的配置<br/>

* 2、__dirname的指向？当前执行文件所在的路径。<br/>

* 3、path.resolve的左右？根据参数将路径转换为绝对路径，例如：<br/>
index: path.resolve(__dirname,'../src/entry.js'), 

* 4、html的引入，使用插件htmlWebpackPlugins生成index.html<br/>

* 5、业务代码的引入，在webpack中没有专门处理。<br/>
因为在react中，一切皆组件；所以在入口处引入react组件APP即可。

* 6、公共库js的引入<br/>
在webpack.config.js中引入，然后使用插件CommonsChunkPlugin打包并提取公用文件。<br/>
```javascript
vendor: [
    path.resolve(__dirname,'../src/util/lib-require1.js'),
    path.resolve(__dirname,'../src/util/lib-require2.js')
]

// 打包公共库/插件文件
// 1、可以将入口的文件合并打包
// 2、可以将入口文件中共用的import/require的文件提取出来
// 3、提取公用代码时，会根据minChunks条件来做判断
new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['vendor'],// entry中的模块名称
    filename: 'vendor.bundle.js',
    minChunks: 2// 最小调用次数
}),
```
* 7、区分打包环境<br/>
（1）package.json中环境变量的设置，例如在scripts中：<br/>
```bash
"scripts": {
  "dev": "set NODE_ENV=dev&&webpack --progress"
},
```
（2）webpack.config中读取环境变量<br/>
```javascript
getEnv: function(){
    // process.env.NODE_ENV在package.json中设置
    switch(process.env.NODE_ENV){
        case 'dev':
            return '/dev/';
        case 'prd':
            return '/prd/';
        case 'hot':
            return '/hot/';
        default:
            return '/dev/';
    }
}
```
* 8、webpack下glob的使用，通常在有很多html或者其它模版的时候需要


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

* 1、filename
* 2、path
* 3、chunkFilename
* 4、判断当前运行环境，根据npm run参数来运行：process.env.NODE_ENV

### 3、loader
loader 让 webpack 可以预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。。<br/>
loader 详细列表参考：https://www.webpackjs.com/loaders/ <br/>
module.rules 允许你在 webpack 配置中指定多个 loader。 例如：<br/>
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

* 1、css的编译<br/>
（1）css-loader，加载.css文件<br/>
（2）style-loader，将css以style形式注入到html<br/>
（3）示例：<br/>
```javascript
// use: [
//     {loader:'style-loader'},// 将css以style形式注入到html
//     {loader:'css-loader'}   // 加载.css文件
// ],
```
（4）ExtractTextPlugin插件，提取css样式文件，避免打包到js中<br/>
```javascript
{
    test: /\.css$/, 
    // 使用了ExtractTextPlugin，就注释此处
    // use: [
    //     {loader:'style-loader'},// 将css以style形式注入到html
    //     {loader:'css-loader'}   // 加载.css文件
    // ],

    // 在js中import或者require引入的css文件，传统的方式是通过js写入到bound.js
    // 使用ExtractTextPlugin插件，可以提取css样式到单独的css文件
    use: ExtractTextPlugin.extract({
        use: 'css-loader'
    })
},
```

* 2、es6/es7的编译<br/>
（1）基本的babel插件<br/>
* babel-loader<br/>
* babel-core<br/>
* babel-preset-env<br/>
* babel-preset-env，为最新的版本，替换了babel-preset-es2015<br/>
* 预设 babel-preset 系列打包了一组插件，类似于餐厅的套餐。如 babel-preset-es2015 打包了 es6 的特性，babel-preset-stage-0 打包处于 strawman 阶段的语法；<br/>
* babel-preset-stage-0 为将es7编译成es5的插件，stage-0包含stage-1，2，3所有功能。<br/>

（2）其它的babel相关插件：<br/>
* babel-cli<br/>
* babel-polyfill<br/>
* Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。<br/>
* 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。<br/>
* babel-polyfill相对来说比较大。<br/>
* babel-runtime<br/>
* babel-plugin-transform-runtime<br/>

（3）兼容ie8，转换es3的插件。目前使用es3ify-loader会报错，待排查？<br/>
```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader:"babel-loader"
            // 配置单独放在.babelrc文件里面
            // query:{
            //    "presets": ["es2015", "react", "stage-0"],
            //    "plugins": [
            //      "add-module-exports",
            //      "transform-class-properties",
            //      "transform-es3-member-expression-literals",
            //      "transform-es3-property-literals",
            //      "transform-es5-property-mutators",
            //      "transform-es3-property-literals"
            //    ]
            // }
        }
    ]
},
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

* 1、文件压缩/混淆：uglifyJsPlugin
（1）压缩插件的基本配置<br/>
（2）通常只在生产环境压缩文件，所以需要判断<br/>


* 2、清理环境：cleanWebpackPlugin


* 3、DllReferencePlugin


* 4、分离js代码：CommonsChunkPlugin
（1）分离js的原因：<br/>
// 1、可以将入口的文件合并打包<br/>
// 2、可以将入口文件中共用的import/require的文件提取出来<br/>
// 3、提取公用代码时，会根据minChunks条件来做判断<br/>
（2）示例代码：
```javascript
entry：
vendor: ['./src/util/lib1.js','./src/util/lib2.js']

plugins：
new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['vendor'],// entry中的模块名称
    filename: 'vendor.bundle.js',
    minChunks: 2// 最小调用次数
}),
```

* 5、分离css文件：extract-text-webpack-plugin，2.1.2对应webpack.2.7.0
（1）分离css的原因<br/>
// 在js中import或者require引入的css文件，传统的方式是通过js写入到bound.js<br/>
// 使用ExtractTextPlugin插件，可以提取css样式到单独的css文件<br/>
（2）怎么分离<br/>
```javascript
loader rule:
// 在js中import或者require引入的css文件，传统的方式是通过js写入到bound.js
// 使用ExtractTextPlugin插件，可以提取css样式到单独的css文件
use: ExtractTextPlugin.extract({
    use: 'css-loader'
})

plugins:
let Plugins = [
    // 提取css，统一打包到style.css
    new ExtractTextPlugin('/styles.css'),
    ...
]
```
* 6、按需加载文件：require.ensure


* 7、文件拷贝：CopyWebpackPlugin
```javascript
/**
 * 文件拷贝，参数如下
 * from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
 * to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
 * toType  file 或者 dir         可选，默认是文件
 * force   强制覆盖先前的插件           可选 默认false
 * context                         可选 默认base context可用specific context
 * flatten 只拷贝文件不管文件夹      默认是false
 * ignore  忽略拷贝指定的文件           可以用模糊匹配
 */
new CopyWebpackPlugin([
    {
    from: __dirname + "/../src/data/",
    to: __dirname + "/../dist/data/"
    }
]),
```

* 8、生成html文件：htmlWebpackPlugins
（1）插件的作用：<br/>
（2）详细配置参考：<br/>
```javascript
// 用于生成html文件，配置参考：https://segmentfault.com/a/1190000007294861
new HtmlWebpackPlugin({
    title: "react-redux-webpack",
    filename: "index.html",
    template: "./src/index.html",  //引用模版，会将处理过后的css和js添加的模版中，也可以是其它格式的模版（需要安装对应的插件）
    inject: true,// script是否至于body底部
    minify: {
        removeAttributeQuotes: true // 移除属性的引号
    },
    hash: true,
    cache: true,
    showErrors: true,// 如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
    // chunks: ['index'],// 指定加载js文件，默认全部加载
    xhtml: false
}),
```
# webpack启动工具
1、安装命令：npm install webpack-cli --save-dev<br/>
2、先不安装，在执行webpack时会提示是否安装，选择yes即可。<br/>
```bash
[ymc@yangmaohaodeMBP /Users/ymc/Desktop/文档/projects/webpack$]webpack
The CLI moved into a separate package: webpack-cli
Would you like to install webpack-cli? (That will run npm install -D webpack-cli) (yes/NO)yes
```

# webpack结合babel编译es6：
### 1、需要安装的babel插件
### 1.1 正常的es6编码通常需要以下两种插件：<br/>
```bash
npm install babel-loader babel-core babel-preset-env --save-dev <br/>
```
* babel-loader<br/>
* babel-core<br/>
* babel-preset-env<br/>babel-preset-env，为最新的版本，替换了babel-preset-es2015<br/>预设 babel-preset 系列打包了一组插件，类似于餐厅的套餐。如 babel-preset-es2015 打包了 es6 的特性，babel-preset-stage-0 打包处于 strawman 阶段的语法

### 1.2 其它的babel相关插件：
* babel-cli<br/>
* babel-polyfill<br/>Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。<br/>
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。<br/>
* babel-runtime<br/>
* babel-plugin-transform-runtime<br/>

### 1.3 查看安装：在packege.json中出现了如下配置
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
（1）babel的配置可以在webpack.config.js完成<br/>
（2）如果项目过大，可以单独配置.babelrc文件<br/>
（3）babel的配置都需要写在webpack.config.js文件options中或者.babelrc 文件中<br/>
在我们告诉 Babel 该做什么之前，你需要做的就是在项目的根路径下创建 .babelrc 文件。然后输入以下内容作为开始：<br/>
```javascript
{
  "presets": [],
  "plugins": []
}
```
这个文件就是用来让 Babel 做你要它做的事情的配置文件。<br/>
例如，安装babel-preset-env后，配置：<br/>
```javascript
{
  "presets": ["env"],
  "plugins": []
}
```

# webpack 执行
1、在项目目录执行：webpack<br/>
2、查看webpack执行进度：webpack --progress<br/>
3、监视文件变化：webpack --watch，也可以在webpack.config.js里面写入配置：<br/>
```javascript
  // 监控文件修改
  watch: false,
```

# webpack常用打包
### 1、html打包插件
* npm install html-webpack-plugin --save-dev
* 配置webpack.config.js
```javascript
  var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
  
  //插件，详细配置参考：https://segmentfault.com/a/1190000007294861
  plugins: [
    new HtmlWebpackPlugin()
  ]
```

### 2、代码压缩混淆
* npm i -D uglifyjs-webpack-plugin
* 配置webpack.config.js
```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin() //详细参考：https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/
  ]
}
```
# webpack示例配置代码
```javascript
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 入口文件：需要进行打包整合的文件路径
  entry: "./src/index.js",
  // path指输出文件路径
  // filename指输出文件名
  // __dirname表示当前路径
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-webpack.bundle.js"
  },

  // 监控文件修改
  watch: false,

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
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new UglifyJsPlugin() //详细参考：https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/
  ]
};
```
























