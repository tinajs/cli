import * as path from 'path'
import * as Config from 'webpack-chain'
import { EnvironmentPlugin } from 'webpack'
import * as MinaEntryPlugin from '@tinajs/mina-entry-webpack-plugin'
import * as MinaRuntimePlugin from '@tinajs/mina-runtime-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'

export default function createWebpackConfig ({ cwd = process.cwd() }) {
  const resolve = (p: string) => path.resolve(cwd, p)

  const loaders = {
    script: require.resolve('babel-loader'),
    style: {
      loader: require.resolve('postcss-loader'),
      options: {
        config: {
          path: resolve('./postcss.config.js'),
        },
      },
    },
  }

  const config = new Config()

  config.context(resolve('src'))

  config.output
    .path(resolve('dist'))
    .filename('[name]')
    .publicPath('/')
    .globalObject('wx')

  config.resolve.symlinks(true)

  config.optimization
    .splitChunks({
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0,
    })
    .runtimeChunk({
      name: 'runtime.js',
    })

  config.mode(isProduction ? 'production' : 'none')

  config.module
    .rule('mina')
      .test(/\.mina$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('mina')
        .loader(require.resolve('@tinajs/mina-loader'))
        .options(loaders)
        .end()

  config.module
    .rule('mina-independent')
      .test(/\.mina$/)
      .include
        .add(/node_modules/)
        .end()
      .use('mina')
        .loader(require.resolve('@tinajs/mina-loader'))
        .end()

  config.module
    .rule('javascript')
      .test(/\.js$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel')
        .loader(require.resolve('babel-loader'))
        .end()

  config.module
    .rule('stylesheet')
      .test(/\.(css|wxss)$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('postcss')
        .loader(require.resolve('postcss-loader'))
        .end()

  config.module
    .rule('filter')
      .test(/\.wxs$/)
      .use('wxs')
        .loader(require.resolve('@tinajs/wxs-loader'))
        .options({
          name: 'wxs/[path]/[name].[hash:6].[ext]',
        })
        .end()

  config.module
    .rule('template')
      .test(/\.wxml$/)
      .use('file')
        .loader(require.resolve('relative-file-loader'))
        .options({
          name: 'wxml/[path]/[name].[hash:6].[ext]',
        })
        .end()
      .use('wxml')
        .loader(require.resolve('@tinajs/wxml-loader'))
        .options({
          raw: true,
          enforceRelativePath: true,
          root: resolve('src'),
        })
        .end()

  config.module
    .rule('file')
      .test(/\.(png|jpg|jpeg|gif|svg)$/)
      .use('file')
        .loader(require.resolve('file-loader'))
        .options({
          name: 'assets/[name].[hash:6].[ext]',
        })
        .end()

  config.plugin('env')
    .use(EnvironmentPlugin, [{
      NODE_ENV: 'development',
      DEBUG: false,
    }])
    .end()

  config.plugin('entry')
    .use(MinaEntryPlugin)
    .end()

  config.plugin('runtime')
    .use(MinaRuntimePlugin)
    .end()

  return config
}
