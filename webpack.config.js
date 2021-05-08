const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production'; //if the string is production, isPrduction will be true
  const CSSExtract = new ExtractTextPlugin('styles.css');

  // console.log('env', env);
  return {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
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
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',//'eval-cheap-module-source-map', //if isProduction is true then source-map else eval-cheap
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
     
  };
};
