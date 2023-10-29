const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  // devServer: {
  //   overlay: {
  //   warnings: false, //不显示警告
  //   errors: false //不显示错误
  //   }
  //   },
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.137.6:8080',
        pathRewrite:{'^/api':''},
        ws:true,            // 用于支持websocket
        changeOrigin:true,  //用于控制请求头中的host值
      }
    }
  }
}