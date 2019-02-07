const { resolve } = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const CWD = process.cwd()

const resolveFromWorkingDir = (path) => resolve(CWD, path)

const loaders = {
  script: require.resolve('babel-loader'),
  style: {
    loader: require.resolve('postcss-loader'),
    options: {
      config: {
        path: resolveFromWorkingDir('./postcss.config.js'),
      },
    },
  },
}

module.exports = {
  context: resolveFromWorkingDir('src'),
  entry: './app.mina',
  output: {
    path: resolveFromWorkingDir('dist'),
    filename: '[name]',
    publicPath: '/',
    globalObject: 'wx',
  },
  module: {
    rules: [
      {
        test: /\.mina$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('@tinajs/mina-loader'),
            options: {
              loaders,
            },
          },
        ],
      },
      {
        test: /\.mina$/,
        include: /node_modules/,
        use: require.resolve('@tinajs/mina-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: loaders.script,
      },
      {
        test: /\.(css|wxss)$/,
        exclude: /node_modules/,
        use: loaders.style,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/[name].[hash:6].[ext]',
          },
        },
      },
      {
        test: /\.wxs$/,
        use: {
          loader: require.resolve('relative-file-loader'),
          options: {
            name: 'wxs/[name].[hash:6].[ext]',
          },
        },
      },
      {
        test: /\.wxml$/,
        use: [{
          loader: require.resolve('relative-file-loader'),
          options: {
            name: 'wxml/[name].[hash:6].[ext]',
          },
        }, {
          loader: require.resolve('@tinajs/wxml-loader'),
          options: {
            raw: true,
          },
        }],
      },
    ],
  },
  resolve: {
    symlinks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0,
    },
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  mode: isProduction ? 'production' : 'none',
}
