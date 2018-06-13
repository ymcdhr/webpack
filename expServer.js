/**
 * 此文件是利用node+express，webpack-dev-middleware和webpack-hot-middleware来实现热加载的方案】
 * webpack-dev-middleware，保存后自动编译文件
 * webpack-hot-middleware，保存后定时刷新文件，但貌似有点儿问题？？无法自动刷新浏览器？？
 */

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
// config.entry.index.unshift("webpack-hot-middleware/client?timeout=10000&reload=true&path=http://127.0.0.1:9000/");

var helper = require("./webpack/webpack.helper");
var publicPath = config.output.publicPath;

var exp = express();
var compiler = webpack(config);

var webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

exp.use(express.static(path.join(__dirname, '/exp/')))
//use in webpack development mode
//未保存文件，实时刷新文件，在内存中，需要刷新浏览器
//具体配置参考：https://github.com/webpack/webpack-dev-middleware
exp.use(webpackDevMiddleware(compiler, {
    // noInfo: true,
    quiet: true,
    // publicPath: helper.getEnv(),// "/exp/"
    publicPath: publicPath//绑定中间件的公共路径,与webpack配置的路径相同
}));
//保存文件后，实时刷新文件，需要设置定时器
exp.use(webpackHotMiddleware(compiler,{
    quiet: true,
    log: console.log, 
    publicPath: publicPath, 
    heartbeat: 1 * 1000,
    hot: true,
    watchOptions: {
        aggregatetimeout: 500, // 延迟时间
        poll: true
    }
}));

//use in webpack production mode
//exp.use(express.static(__dirname));

exp.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './src/index.html'));
});
//访问的是json文件，本来是通过插件copy的，CopyWebpackPlugin。在此配置一下访问。
exp.get('/data/data.json', function(req, res) {
    res.sendFile(path.join(__dirname, './src/data/data.json'));
});
exp.listen(9000, '127.0.0.1', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://127.0.0.1:9000');
});