const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production'; //if the string is production, isPrduction will be true
  const CSSExtract = new ExtractTextPlugin('styles.css');

  // console.log('env', env);
  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'bundle.js'
    },
    module: {
      rules: [{
        //teaching webpack how to load babel
        loader: 'babel-loader',
        test: /\.js$/, //only when test meets this criteria and the file is not in the node modules folder go ahead and run it through babel
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,  //question mark made 's' optional
        // use: [  //use allows us to provide an array of loaders
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader'
        // ]   
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: { 
                sourceMap: true
              }
            }
          ]
        })

      }]
    },
    plugins: [ //The plugins array is where we can set up all of the plugins that shoudl have access to change and work with the existing webpack build.
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), //JSON.stringify will autmatically add the qoutes
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',//'eval-cheap-module-source-map', //if isProduction is true then source-map else eval-cheap
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/' //publicPath lets us specify where those bundled assets should live
    }
     
  };
};
