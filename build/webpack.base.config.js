const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os'); // 系统操作函数
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 指定线程池个数

process.traceDeprecation = true
const config = require('../config')
const debug = require('debug')('要起飞啦 🚀🚀 🚀🚀 🚀🚀 🚀🚀 🚀🚀')
const paths = config.utils_paths;
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__
debug('正在创建配置💋😙💋😙💋😙💋😙💋😙💋😙')
const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: __DEV__?"source-map":false,
    resolve: {
        modules: [paths.client(), "node_modules"],
        extensions: ['.js', '.jsx', '.json']
    },
    module: {},
    externals: {
        moment: "moment",
        lodash: {
            commonjs: "lodash",
            amd: "lodash",
            root: "_" // indicates global variable
        },
        immutable: "Immutable"
    }

}
webpackConfig.optimization = {
    occurrenceOrder: true,
    runtimeChunk: { name: 'runtime' },
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
        automaticNameDelimiter: "-",
        name: true,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        minChunks: 2,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks: "initial",
                name: "vendor",
                priority: 10,
                enforce: true
            },
            
            lazy: {
                test: ({ resource, count }) => {
                    return /antd/.test(resource)
                },
                chunks: "async",
                name: "lazy",
                priority: 10,
                enforce: true
            },
            commons: {
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                name:"common",
                minChunks: 3,
                maxInitialRequests: 5, 
                minSize: 0,
                priority: 20,
            },
        }
    }
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
    app: __DEV__
        ? [APP_ENTRY, 'react-hot-loader/patch'].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
        : [APP_ENTRY],
}

// ------------------------------------
// Plugins
// ------------------------------------

const plugins = [

    new webpack.DefinePlugin(config.globals),
    new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // new HappyPack({
    //     id: 'babel',
    //     threads: 4,
    //     loaders: ['babel-loader?cacheDirectory', 'style-loader', 'css-loader'],
    //     threadPool: happyThreadPool,
    //     verbose: true
    // }),
    new HappyPack({
        id: 'js',
        threads: 4,
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory'],
        verbose: true
    }),

    new HappyPack({
        id: 'styles',
        threads: 4,
        threadPool: happyThreadPool,
        loaders: ['style-loader', 'css-loader',],
        verbose: true
    }),
   
    new HtmlWebpackPlugin({
        template: paths.client('index.html'),
        hash: false,
        favicon: paths.client('static/favicon.png'),
        filename: `index.html`,
        inject: 'body',
        chunksSortMode:"none",
        // chunks: ['app','vendor',"runtime"],
        minify: {
            collapseWhitespace: true
        }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
        options: {
            context: __dirname
        }
    })


]



webpackConfig.plugins = plugins

if (config.user) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin()
    )
}



// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /imsdk/],
        include: paths.client(),
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                cacheDirectory: true,
                plugins: [
                    "react-hot-loader/babel",
                    "transform-class-properties",
                    "transform-runtime",
                    "transform-async-to-generator",
                    "syntax-dynamic-import",

                    //   "dynamic-import-webpack",
                    "lodash",
                    ['import', [{ libraryName: 'antd', libraryDirectory: "es", style: 'css' }]]

                    // "transform-flow-strip-types"
                ],
                presets: ['env', 'react', 'stage-0']
            },
        },
    },
]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]?sourceMap&-minimize'

webpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: [/node_modules/, /styles/],
    use: [
        "style-loader",
        {
            loader: "css-loader",
            options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
        }
    ]
});

var autoprefixer = require('autoprefixer');
webpackConfig.module.rules.push({
    test: /\.css$/,
    include: [/node_modules/, /styles/],
    use: [
        "style-loader",
        "css-loader",
        {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [
                        require('postcss-flexibility'),
                        autoprefixer({
                            browsers: [
                                'ie >= 9',
                                'ie_mob >= 10',
                                'ff >= 30',
                                'chrome >= 34',
                                'safari >= 7',
                                'opera >= 23',
                                'ios >= 7',
                                'android >= 4.4',
                                'bb >= 10'
                            ]
                        }),
                    ];
                }
            }
        },
    ]

})


// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
    {
        test: /\.(png|jpg)$/,
        use: { loader: 'url-loader', options: { limit: 20000 } },
    },
    {
        test: /\.svg(\?.*)?$/,
        use: { loader: 'url-loader', options: { limit: 20000 } },
    },
    {
        test: /\.woff(\?.*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                prefix: 'fonts/&name=[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/font-woff'
            }
        },
    },
    {
        test: /\.woff2(\?.*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                prefix: 'fonts/&name=[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/font-woff2'
            }
        },
    },
    {
        test: /\.otf(\?.*)?$/,
        use: {
            loader: 'file',
            options: {
                prefix: 'fonts/&name=[path][name].[ext]',
                limit: 10000,
                mimetype: 'mimetype=font/opentype'
            }
        },
    },
    {
        test: /\.ttf(\?.*)?$/,
        use: {
            loader: 'file-loader',
            options: {
                prefix: 'fonts/&name=[path][name].[ext]',
                limit: 10000,
                mimetype: 'application/octet-stream'
            }
        },
    },
    {
        test: /\.eot(\?.*)?$/,
        use: {
            loader: 'file-loader',
            options: {
                prefix: 'fonts/&name=[path][name].[ext]',
            }
        },
    }
)

module.exports = webpackConfig
