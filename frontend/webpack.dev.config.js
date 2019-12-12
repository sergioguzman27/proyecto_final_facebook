const path = require('path');

module.exports = {
  entry: {
    "app": path.resolve(__dirname, 'src/entries/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    historyApiFallback: true,
    disableHostCheck: true,
    clientLogLevel: 'error',
    compress: true,
    noInfo: true,
    quiet: true,
    open: true,
    stats: 'errors-only',
    proxy: [{
      path: '/api/',
      // pathRewrite: {"^/api" : ""},
      target: 'http://localhost:8000/',
      secure: false,
      changeOrigin: true,
    }],
  },
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  }
}
