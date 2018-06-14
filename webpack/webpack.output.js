;(function(m,undefined){
    const helper = require("./webpack.helper");
    // const build = path.resolve(ROOT_PATH, 'build');

    let output = {
        path: `${__dirname}/../${helper.getEnv()}`,
        filename: "[name]-[hash:6].js",
        chunkFilename: "[name].min.js",
        // filename: "[name]-[hash:6].js",// 多入口时，必须使用[name].js的形式定义输出文件
        // publicPath: "http://127.0.0.1:9000/", // 热加载模块使用，最好是绝对地址
        // publicPath: "/",// prd路径

    };

    if(helper.getEnv()==="des"||helper.getEnv()==="exp"){
        output.push({
            publicPath: "http://127.0.0.1:9000/" // 热加载模块使用，最好是绝对地址
        })
    }
    m.exports = output;
}(module))