const fds = require('fe-dev-server')
const path = require('path')
const webpack = require('webpack')

const fdsConfig = require('../fds-config')
const webpackConfig = require('../config/webpack.config')

const compiler = webpack(webpackConfig)

compiler.plugin('compile', () => {
  console.log('webpack compiling...')
})

compiler.watch({
  aggregateTimeout: 50
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    return console.log('webpack build error')
  }

  const time = (stats.endTime - stats.startTime) / 1000;

  console.log(`webpack build success in ${time.toFixed(2)} s`);
})

const app = fds(fdsConfig)

