const webpack = require('webpack')
const path = require('path')

const config = require('../config')
const paths = config.utils_paths;
const webpackConfig = {
    mode: "development" 
}

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
    filename: "[name].js",
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    chunkFilename: "[name].js"
}

// ------------------------------------
// Plugins
// ------------------------------------

const devPlugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
   
]
webpackConfig.plugins = devPlugins;


module.exports = webpackConfig
