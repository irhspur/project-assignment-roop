const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            // {
            //     test: /\.(ts|js)x?$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //     },
            // },
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
    ],
};
