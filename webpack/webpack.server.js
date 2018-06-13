;(function(m,undefined){
    const path = require('path');
    const helper = require("./webpack.helper");

    let hotServer = {
        contentBase: path.join(__dirname, helper.getEnv()), //启动网站的根目录，告诉服务器从哪里查找内容。
        host: helper.config.server, //如果指定的host，这样同局域网的电脑或手机可以访问该网站，host的值在dos下使用ipconfig获取——只能在命令行用作参数的形式
        port: 9000, //端口改为9000——只能在命令行用作参数的形式?
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
      };

    m.exports = hotServer;
}(module))