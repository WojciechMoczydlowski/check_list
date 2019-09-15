const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const deployDir = process.env.DEPLOY_DIR || path.resolve(paths.appRoot, "deploy");

const tsAliases = extractTsAliases();

/** @type {import("webpack").Configuration} */
module.exports = (env, argv) => {
    const isProd = argv.mode === "production";
    const isStorybook = !!argv.storybook;

    return {
        entry: [
            argv.inline && "webpack-dev-server/client?",
            argv.inline && "webpack/hot/only-dev-server",
            path.join(paths.src, "index.tsx"),
        ].filter(e => e),

        plugins: [
            !isStorybook &&
                new HtmlWebpackPlugin({
                    template: path.join(paths.appRoot, "index.html"),
                }),
            !isStorybook &&
                isProd &&
                new HtmlWebpackIncludeAssetsPlugin({
                    assets: ["config.js"],
                    append: false,
                }),
            new webpack.EnvironmentPlugin({
                APP_VERSION: "0.0.0-dev",
                AUTH_ENDPOINT: "",
                DEBUG: !isProd,
            }),
            new ForkTsCheckerPlugin({
                checkSyntacticErrors: true,
                tsconfig: paths.tsConfig,
                watch: paths.src,
                async: !isProd,
            }),
            isProd &&
                new MiniCssExtractPlugin({
                    filename: "[name].css",
                    chunkFilename: "[id].css",
                }),
        ].filter(p => p),

        output: {
            path: path.resolve(deployDir),
            filename: "[name].js",
            publicPath: "/",
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                config: paths.config(isProd ? "production" : "development"),
                ...tsAliases,
            },
        },

        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    enforce: "pre",
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                },
                {
                    test: /\.tsx?$/,
                    include: [paths.src],
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                babelrc: false,
                                sourceMaps: true,
                                presets: [
                                    "@babel/react",
                                    "@babel/typescript",
                                    [
                                        "@babel/env",
                                        {
                                            modules: false,
                                            useBuiltIns: "usage",
                                            corejs: 3,
                                            targets: "cover 99.5% in PL",
                                        },
                                    ],
                                ],
                                plugins: [
                                    "@babel/plugin-proposal-class-properties",
                                    "@babel/plugin-syntax-dynamic-import",
                                ].filter(p => p),
                            },
                        },
                    ].filter(Boolean),
                },
                {
                    test: /\.css$/,
                    oneOf: [
                        {
                            resourceQuery: /global/,
                            use: styleLoader(false, isProd, false),
                        },
                        {
                            use: styleLoader(false, isProd, false),
                        },
                    ],
                },
                {
                    test: /\.(sass|scss)$/,
                    use: styleLoader(true, isProd),
                },
                {
                    test: /\.(ttf|eot|woff|woff2)(\?[\s\S]+)?$/,
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
                {
                    test: /\.(jpg|png|svg|gif)$/,
                    loader: "file-loader",
                    options: {
                        name: "images/[name]-[hash:5].[ext]",
                    },
                },
            ],
        },

        devServer: {
            hot: true,
            contentBase: path.join(paths.appRoot, "deploy"),
            publicPath: "/",
            disableHostCheck: true,
            port: 1305,
            compress: true,

            host: "0.0.0.0",
            historyApiFallback: true,
        },
    };
};

function extractTsAliases() {
    const mappings = {};
    const tsconfig = require(paths.tsConfig);

    for (let key in tsconfig.compilerOptions.paths) {
        let to = tsconfig.compilerOptions.paths[key][0];
        let from = key;

        if (from.endsWith("/*")) {
            from = from.substr(0, from.length - 2);
        }

        if (to.endsWith("/*")) {
            to = to.substr(0, to.length - 2);
        }

        mappings[from] = path.join(paths.src, to);
    }

    return mappings;
}

function styleLoader(isSass, isProd, useCssModules) {
    let loader;
    let postCssPlugins;
    let cssLoaderOptions;

    if (useCssModules === undefined) {
        useCssModules = true;
    }

    if (isProd) {
        loader = [MiniCssExtractPlugin.loader];
        cssLoaderOptions = {
            importLoaders: isSass ? 2 : 1,
            modules: {
                localIdentName: "[hash:base64:20]",
                mode: useCssModules ? "local" : "global",
            },
        };
        postCssPlugins = [
            require("autoprefixer"),
            require("cssnano")({
                preset: "default",
            }),
        ];
    } else {
        loader = [
            "style-loader",
            {
                loader: "css-modules-typescript-loader",
                options: {
                    mode: "emit",
                },
            },
        ];
        cssLoaderOptions = {
            importLoaders: isSass ? 2 : 1,
            modules: {
                localIdentName: "[folder]__[name]__[local]",
                mode: useCssModules ? "local" : "global",
            },
            sourceMap: true,
        };
        postCssPlugins = [require("autoprefixer")];
    }

    loader = [
        ...loader,
        {
            loader: "css-loader",
            options: cssLoaderOptions,
        },
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                plugins: () => [...postCssPlugins],
            },
        },
    ];

    if (isSass) {
        loader = [...loader, "sass-loader"];
    }

    return loader;
}
