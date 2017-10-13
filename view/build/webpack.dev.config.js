//开发环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
    // dev配置
config.devServer = {
    hot: true,
    inline: true,
    // proxy: {
    //     "/": {
    //         target: 'http://127.0.0.1:8802/',
    //         secure: false
    //     },
    // }
}
config.devtool = '#source-map'
module.exports = config