'use strict'
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// const name = defaultSettings.title || 'gong yi' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  //lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    proxy: {
        '': {     //这里最好有一个 /
            target: 'http://81.70.200.206:8090/bofc/',  // 后台接口域名
            ws: true,        //如果要代理 websockets，配置这个参数
            secure: true,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            // pathRewrite:{
            //     '^/api':''
            // }
        }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    // plugins: [
    //   new CompressionPlugin({
    //     test: /\.(png|jpg)?$/i, // 哪些文件要压缩
    //     filename: '[path].gz[query]',　// 压缩后的文件名
    //     algorithm: 'gzip',　// 使用gzip压缩
    //     minRatio: 1,　// 压缩率小于1才会压缩
    //     deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
    //   })
    // ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({
      bypassOnDebug: true
    })
    .end()
  },
}
