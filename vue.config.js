module.exports = {
  devServer: {
    open: true,
    // host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: {
    //   // 配置跨域
    //   '/api': {
    //     target:
    //       'https://nei.netease.com/api/apimock/f9fce074f5a53971f9d38c0d1c8a3726/api/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: app => {}
  },
  publicPath: '/',
  productionSourceMap: false,
  css: {
    extract: true
  },
  chainWebpack: config => {
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all'
    });
    config.externals({
      axios: 'axios',
      vue: 'Vue'
    });
  }
};
