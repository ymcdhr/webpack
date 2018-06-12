;(function(m,undefined){
    const webpack = require('webpack');
    const path = require('path');

    let Helper = {
        config:{

        },
        entry: {
            // "./src/entry.js",
            // path后面的路径？和server.js中配置的一致，也和output中publicPath一致
            // hmr: 'webpack-hot-middleware/client?path=/dist/&timeout=20000',
            // And then the actual application
            // 业务代码入口
            index: path.resolve(__dirname,'../src/entry.js'),
            // 引入公用库文件
            // lib-require1.js／lib-require2.js中都引用的公共文件，会被CommonsChunkPlugin打包到一个文件中，具体查看plugins中配置
            vendor: [
                path.resolve(__dirname,'../src/util/lib-require1.js'),
                path.resolve(__dirname,'../src/util/lib-require2.js')
            ]
        },
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
    }

    m.exports = Helper;

}(module));