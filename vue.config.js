const path = require('path')

const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //生产环境配置资源引入路劲
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
  pages: {
    index: {
      entry: 'src/views/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify
    }
  },
  devServer: {
    // autoOpenBrowser: true,
    overlay: false,
    // overlay: {
    //     warnings: false,
    //     errors: false
    // },
    // lintOnSave: false,
    proxy: {
      '/api': {//测试用api
              target:'https://www.runoob.com/', // 你请求的第三方接口域名或者ip
              changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite:{
                '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求https://www.runoob.com/这个地址的时候直接写成/api即可。
              }
            },
      '/supor':{
              target:'https://aiot-saas.t.supor.com/', // 你请求的第三方接口域名或者ip
              changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite:{
                '^/supor': ''  // 替换target中的请求地址，也就是说以后你在请求https://www.runoob.com/这个地址的时候直接写成/api即可。
              }
      },
      '/local':{//本地的接口
              // target:'http://20.60.5.235:8848/ShineMaster-X/cgi-bin/', // 你请求的第三方接口域名或者ip http://20.60.5.235:51070/cgi-bin json\form-generator\regular\regularList.json
              target:'http://20.60.5.235:60486/json/form-generator/', // 你请求的第三方接口域名或者ip 直接在vscode运行打包的项目
              changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite:{
                '^/local': ''  // 替换target中的请求地址，也就是说以后你在请求https://www.runoob.com/这个地址的时候直接写成/api即可。
              }
      },
      '/jianyong':{//建勇的接口
              target:'http://20.4.2.125:8000/public-api/', // 你请求的第三方接口域名或者ip
              changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite:{
                '^/jianyong': ''  // 替换target中的请求地址，也就是说以后你在请求https://www.runoob.com/这个地址的时候直接写成/api即可。
              }
      },
      '/root':{//本地
              target:'http://20.60.5.235:60486/', // http://20.60.5.235:8848/
              changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite:{
                '^/root': ''  // 替换target中的请求地址，也就是说以后你在请求https://www.runoob.com/这个地址的时候直接写成/api即可。
              }
      },
      
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
