const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  entry: './src/js/main.js',
  
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'common.min.js'
  },
  
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/js')
        
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize!autoprefixer-loader!stylus-loader')
      }
    ]
    
  },
  
  plugins: [
    new ExtractTextPlugin('common.min.css'),
    
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments: false,
      },
    })
  ]
  
};