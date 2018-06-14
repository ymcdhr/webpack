;(function(m,undefined){
    const webpack = require('webpack');
    const path = require('path');

    let Helper = {
        config:{
            server: "127.0.0.1",
            port: "9000"
        },
        entry: {
            // "./src/entry.js",
            // path后面的路径？和server.js中配置的一致，也和output中publicPath一致
            // hmr: 'webpack-hot-middleware/client?path=/dist/&timeout=20000',
            // And then the actual application

            // react 热加载模块
            // hotServer: [
            //     'react-hot-loader/patch',
            //     // 开启react代码的模块热替换（HMR）
    
            //     'webpack-dev-server/client?http://127.0.0.1:9000/',
            //     // 为webpack-dev-server的环境打包好运行代码
            //     // 然后连接到指定服务器域名与端口
    
            //     'webpack/hot/only-dev-server',
            //     // 为热替换（HMR）打包好运行代码
            //     // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
            // ],

            // 业务代码入口
            index: [
                // 'webpack-dev-server/client?http://127.0.0.1:9000/',
                path.resolve(__dirname,'../src/entry.js')
            ],
            // 引入公用库文件
            // lib-require1.js／lib-require2.js中都引用的公共文件，会被CommonsChunkPlugin打包到一个文件中，具体查看plugins中配置
            vendor: [
                path.resolve(__dirname,'../src/util/lib-require1.js'),
                path.resolve(__dirname,'../src/util/lib-require2.js')
            ]
        },
        getEnv: function(){
            // process.env.NODE_ENV在package.json中设置，使用export更好，set有问题
            console.log("process.env.NODE_ENV:",process.env.NODE_ENV);

            switch(process.env.NODE_ENV){
                case 'des':
                    return 'des';
                case 'exp':
                    return 'exp';
                case 'dev':
                    return 'dev';
                case 'prd':
                    return 'prd';
                case 'hot':
                    return 'hot';
                default:
                    return 'dev';
            }
        }
    }

    m.exports = Helper;

}(module));