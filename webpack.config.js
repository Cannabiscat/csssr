
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/frontend`,
  entry: {
    app: ['./app', './components/Comps', './components/App'],
  },
  output: {
    path: `${__dirname}/public/`,
    filename: '[name].js',
    library: '[name]',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    // }),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0', 'stage-1'],
      },
    }],
  },
};
if (NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }));
}
