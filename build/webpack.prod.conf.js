'use strict'
const path = require('path')
const utils = require('./utils')
// const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: false, usePostCSS: true})
  },
  output: {
    path: path.resolve(__dirname,'../dist'),
    filename: "main.js",
    libraryTarget:'umd',
    library:"fzm-ui"
    // filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  externals:{
    vue:{
      root:'Vue',
      commonjs:'vue',
      commonjs2:'vue',
      amd:'vue'
    }
  },
  // optimization: {
  //   // 会生成 main1.js
  //   // runtimeChunk: {
  //   //   name: 'manifest'
  //   // },
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true, parallel: true, sourceMap: false, //true
  //       uglifyOptions: {
  //         warnings: false
  //       }
  //     }),
  //     // new OptimizeCSSPlugin({
  //     //   cssProcessorOptions: {
  //     //       safe: true
  //     //   }
  //     // })
  //   ],
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     name: false,
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         chunks: 'initial',
  //         priority: -10,
  //         reuseExistingChunk: false,
  //         test: /node_modules\/(.*)\.js/
  //       },
  //       // styles: {
  //       //   name: 'styles',
  //       //   test: /\.(scss|css)$/,
  //       //   chunks: 'all',
  //       //   minChunks: 1,
  //       //   reuseExistingChunk: true,
  //       //   enforce: true
  //       // }
  //     }
  //   }
  // },
  plugins: [
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'fzm-ui.min.css', chunkFilename: 'fzm-ui.[contenthash:12].css'
    // }),
    // new webpack.HashedModuleIdsPlugin()
  ]
})

// if (config.build.productionGzip) {
//   const CompressionWebpackPlugin = require('compression-webpack-plugin')
//   webpackConfig.plugins.push(new CompressionWebpackPlugin({
//     asset: '[path].gz[query]',
//     algorithm: 'gzip',
//     test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
//     threshold: 10240,
//     minRatio: 0.8
//   }))
// }
module.exports = webpackConfig
