const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //处理map文件
  // productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
      }
    }
  }
})
