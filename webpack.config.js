const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const isPro = process.env.NODE_ENV.trim() === 'production';
const ExtractText = new ExtractTextPlugin({
    filename: 'css/style.css',
    disable: !isPro,
});

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: isPro ? 'http://wldevelop/' : '/',
    filename: 'js/bashihui.js',
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    host: "192.168.1.104",
    open: true,
    // hot: true,
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "es2015",
            ]
          }
        },
        // exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractText.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: isPro,
            }
          }, {
            loader: "sass-loader",
          }],
          // use style-loader in development
          fallback: "style-loader",
        })
      },
      {
        test: /\.css$/,
        use: ExtractText.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: isPro,
            },
          }],
          // use style-loader in development
          fallback: "style-loader",
        }),
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    ExtractText,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
  ],
};
