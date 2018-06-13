/**
 * 此文件是利用node api和webpack-dev-server实现的服务和热加载
 * 貌似热加载hmr有些问题
 */
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');
config.entry.index.unshift("webpack-dev-server/client?http://127.0.0.1:9000/");
config.entry.index.unshift("webpack/hot/dev-server");


var compiler = webpack(config);
var WebpackDevServer = require('webpack-dev-server');
var helper = require("./webpack/webpack.helper");



var server = new WebpackDevServer(compiler, {
    /*我们写入配置的地方*/
    contentBase: path.join(__dirname, helper.getEnv()), //启动网站的根目录，告诉服务器从哪里查找内容。
    open: true, // 自动打开浏览器
    index: 'index.html', // 与HtmlWebpackPlugin中配置filename一样
    inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面；当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个iframe中
    hot: true, // 启用 webpack 的模块热替换特性，此时建议使用inline为true
    compress: false, //gzip压缩
    progress: true,
    historyApiFallback: true,
    // proxy: {// 代理功能，需要安装插件：http-proxy-middleware
    //     "/api": "http://127.0.0.1:9000"
    // }
    // publicPath: "/hot/", // 在访问的文件路径前面加载公共的目录路径
    // publicPath: "http://127.0.0.1:9000/", // 绝对路径写法，模块热替换所必需的
    // watchContentBase: false, // 监控contentBase下的文件是否修改，修改了就重新编译
    // watchOptions: {// watch监控选项
    //     poll: 20000, // 每20秒检查一次变动
    //     ignored: "/node_modules/" // 不监控的目录
    // }
});
server.listen(9000, '127.0.0.1', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://127.0.0.1:9000');
});