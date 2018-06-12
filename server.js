var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var exp = express();
var compiler = webpack(config);

exp.use(express.static(path.join(__dirname, '/')))
//use in webpack development mode
//未保存文件，实时刷新文件，在内存中
exp.use(require('webpack-dev-middleware')(compiler, {
    // noInfo: true,
    quiet: true,
    publicPath: "/dist/",
    // publicPath: config.output.publicPath//绑定中间件的公共路径,与webpack配置的路径相同
}));
//保存文件后，实时刷新文件
exp.use(require('webpack-hot-middleware')(compiler,{
    log: console.log, path: '/dist/', heartbeat: 10 * 1000
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
exp.listen(3000, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});