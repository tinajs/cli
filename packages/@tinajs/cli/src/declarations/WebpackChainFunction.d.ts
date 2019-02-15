import * as WebpackConfig from 'webpack-chain'

interface WebpackChainFunction {
  (config: WebpackConfig, resolve: (path: string) => string): void,
}

export default WebpackChainFunction
