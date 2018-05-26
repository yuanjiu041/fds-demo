const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const entry = {}
const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'app')
const buildPath = path.join(root, 'build')

glob.sync('{common,pages}/**/*.js', {
  cwd: srcPath
}).forEach((filePath) => {
  const chunk = filePath.slice(0, -3)
  entry[chunk] = [`./${chunk}`]
})

const config = {
  context: srcPath,
  entry: entry,
  output: {
    path: buildPath,
    pathinfo: true,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      Components: path.join(srcPath, 'components'),
      common: path.join(srcPath, 'commons')
    }
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css')
  ]
}

module.exports = config
