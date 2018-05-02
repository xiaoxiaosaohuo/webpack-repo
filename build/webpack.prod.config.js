const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const paths = config.utils_paths;
const webpackConfig = {
    mode: "production" 
};
webpackConfig.output = {
    filename: "[name].[chunkhash].js",
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    chunkFilename: "[name].[chunkhash].chunk.js"
}
const prodPlugins = [
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.NamedChunksPlugin((chunk) => {
    //     if (chunk.name) {
    //       return chunk.name;
    //     }
    //     return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false,
        }),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap:true,
            cache: true,
            uglifyOptions:{
                ie8:false,
                compress: true,
                // ecma: 8,
                output:{
                    comments: false,
                    beautify: false,
                }
            }
       }),

]
webpackConfig.plugins = prodPlugins;
module.exports = webpackConfig
