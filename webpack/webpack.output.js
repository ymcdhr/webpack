;(function(m,undefined){
    const helper = require("./webpack.helper");

    let output = {
        path: `${__dirname}/../${helper.getEnv()}`,
        filename: "[name].js"
        // filename: "[name]-[hash:6].js",// 多入口时，必须使用[name].js的形式定义输出文件
        // publicPath: "/dist/",
    };
    m.exports = output;
}(module))