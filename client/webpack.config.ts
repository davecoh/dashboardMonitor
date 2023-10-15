const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'dev-container/index.html'),
    filename: './index.html',
});

module.exports = (env: {NODE_ENV: string; analyzerMode: string}) => {
    const isDevEnv = env.NODE_ENV !== 'prod';
    return {
        entry: path.join(__dirname, 'src/index.ts'),
        devtool: isDevEnv ? 'eval-source-map' : false,
        output: {
            filename: 'ts-tcp.js',
            chunkFilename: '[name].chunk.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.svg$/,
                    issuer: /\.[tj]sx?$/,
                    resourceQuery: /react/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                replaceAttrValues: {
                                    '#000': '{props.color}',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    resourceQuery: { not: [/react/] },
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[contenthash].[ext]',
                                outputPath: 'assets',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: isDevEnv,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    enabled: true,
                                    optimizationLevel: 3,
                                },
                                pngquant: {
                                    quality: [0.65, 0.75],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ESLintPlugin(),
            htmlWebpackPlugin,
            new ModuleFederationPlugin({
                name: "",
                filename: "",
                exposes: {},
                remotes: {},
                shared: {},
            }),             
            !isDevEnv && new Analyzer({ analyzerMode: env.analyzerMode ?? 'disabled' }),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        devServer: {
            port: 3000,
            disableHostCheck: true,
            host: 'localhost',
            historyApiFallback: true,
        },
    };
};
