const path = require('path');
const webpack = require('webpack');
const config = require('../config')
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const vendors = [
    'react',
    'react-dom',
    'react-router',
    'lodash',
    'moment',
    'immutable'
    // ...其它库
];
module.exports = {
    entry: {
        lib: vendors //
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'dll'),
        // libraryTarget: 'commonjs',
        library: '_dll_[name]_[hash]' // 全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]_[hash]',
            path: path.join(__dirname, 'dll', '[name].manifest.json') // manifest文件的输出路径
        })
    ]
}