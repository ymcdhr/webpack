;(function(m,undefined){
    const ExtractTextPlugin = require('extract-text-webpack-plugin');


    let Rules = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader:"babel-loader"
                    // 配置单独放在.babelrc文件里面
                    // query:{
                    //     "presets": ["es2015", "react", "stage-0"],
                    //     "plugins": [
                    //       "add-module-exports",
                    //       "transform-class-properties",
                    //       "transform-es3-member-expression-literals",
                    //       "transform-es3-property-literals",
                    //       "transform-es5-property-mutators",
                    //       "transform-es3-property-literals"
                    //     ]
                    // }
                }
            ]
        },
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
        // 不使用es3ify-loader，而是使用babel中的插件，在.babellrc中配置？
        // {// 将es5转换成es3
        //     test: /\.js$/,
        //     use: ["es3ify-loader"]
        // }
    ];

    m.exports = Rules;
}(module));